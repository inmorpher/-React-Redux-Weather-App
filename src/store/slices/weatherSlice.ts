import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from '../../api';
import { MetricConverter, MetricReturnType } from '../../utils/services/converter/metric.converter';
import { PopupWeatherScaleService } from '../../utils/services/curves/popup.weather.service';
import { getTempritureScale } from '../../utils/services/definitions/daily.temp.definition';
import { getDailyScaleCoords } from '../../utils/services/definitions/daily.temp.scale';
import { pressureDefinition } from '../../utils/services/definitions/pressure.definition';
import { sunDefinition } from '../../utils/services/definitions/sunDefinition';
import { ScaleType, getSvgScale } from '../../utils/services/definitions/svgScale.definition';
import { getWindDirection } from '../../utils/services/definitions/wind.direction';
import { TimeService } from '../../utils/services/time/time.service';
import { RootState } from '../store';
import { IWeatherData } from '../weather.type';

export type LoadingStatus = boolean;
export interface IWeatherState {
	firstLaunch: boolean;
	loading: LoadingStatus;
	data: IWeatherData;
	error: boolean;
}

const initialState: IWeatherState = {
	firstLaunch: true,
	loading: false,
	data: {} as IWeatherData,
	error: false,
};

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		setFirstLoad: (state, action) => {
			state.firstLaunch = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchWeather.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchWeather.rejected, (state) => {
			state.error = true;
			state.loading = false;
		});
		builder.addCase(
			fetchWeather.fulfilled,
			(state, action: PayloadAction<IWeatherData | null>) => {
				if (action.payload) {
					state.data = action.payload;
					state.error = false;
					state.loading = false;
					state.firstLaunch = false;
				}
			},
		);
	},
});

export const selectLocation = createSelector(
	(state: RootState) => state.weather.data.city,
	(state: RootState) => state.weather.data.countryCode,
	(state: RootState) => state.weather.data.country,
	(state: RootState) => state.weather.data.state,
	(state: RootState) => state.weather.data.lat,
	(state: RootState) => state.weather.data.lon,
	(state: RootState) => state.weather.data.current?.dt,
	(state: RootState) => state.weather.data.timezone,
	(city, countryCode, country, state, lat, lon, dt, timezone) => {
		return {
			city,
			country: countryCode || country,
			state: state || '',
			lat,
			lon,
			time: dt ? new TimeService(dt, timezone).getTime('hoursAndMinutes').result() : '',
		};
	},
);

export const selectLoadingStatus = createSelector(
	(state: RootState) => state.weather.loading,
	(state: RootState) => state.weather.data,
	(loading, data) => {
		console.log(loading, loading);
		if (Object.keys(data).length > 0 && !loading) {
			return true;
		} else {
			return false;
		}
	},
);

export const selectHourlyWeather = createSelector(
	(state: RootState) => state.weather.data.hourly,
	(state: RootState) => state.weather.data.timezone,
	(state: RootState) => state.user.data.userMetrics,
	(hourly, timezone, userMetrics) => {
		return {
			hourly,
			timezone,
			userMetrics,
		};
	},
);

export const selectMainWeatherDescription = createSelector(
	(state: RootState) => state.weather.data.current,
	(state: RootState) => state.weather.data.daily[0].temp,
	(state: RootState) => state.user.data.userMetrics,
	(current, daily, userMetrics) => {
		return {
			temp: MetricConverter.getTemp(current.temp, userMetrics, 'short'),
			condition: current.weather[0].description,
			max: MetricConverter.getTemp(daily.max, userMetrics, 'short'),
			min: MetricConverter.getTemp(daily.min, userMetrics, 'short'),
			clouds: current.clouds,
		};
	},
);

export const selectWeatherIconId = createSelector(
	(state: RootState) => state.weather.data.current.weather[0].icon,
	(icon) => {
		const weatherIdDigit = icon.slice(0, 2);
		const weatherIdLetter = icon.charAt(2);

		return {
			iconCode: weatherIdDigit,
			timeOfDay: weatherIdLetter === 'd' ? 'day' : 'night',
		};
	},
);

export const selectWind = createSelector(
	(state: RootState) => state.weather.data.current.wind_deg,
	(state: RootState) => state.weather.data.current.wind_speed,
	(state: RootState) => state.weather.data.current.wind_gust,
	(state: RootState) => state.user.data.userMetrics,
	(wind_deg, wind_speed, wind_gust, userMetric) => {
		return {
			deg: wind_deg,
			speed: MetricConverter.getSpeed(wind_speed, userMetric, true),
			gust: wind_gust ? MetricConverter.getSpeed(wind_gust, userMetric, true) : null,
			literal: getWindDirection(wind_deg),
		};
	},
);

export const selectHumidity = createSelector(
	(state: RootState) => state.weather.data.current.dew_point,
	(state: RootState) => state.weather.data.current.humidity,
	(state: RootState) => state.user.data.userMetrics,
	(dew_point, humidity, userMetrics) => {
		return {
			dew_point: MetricConverter.getTemp(dew_point ? dew_point : 0, userMetrics, 'short'),
			humidity,
		};
	},
);

export const selectFeelsLike = createSelector(
	(state: RootState) => state.weather.data.current.feels_like,
	(state: RootState) => state.weather.data.current.temp,
	(state: RootState) => state.user.data.userMetrics,
	(feels_like, temp, userMetrics) => {
		return {
			temp: MetricConverter.getTemp(feels_like, userMetrics, 'short'),
			condition:
				temp > feels_like
					? 'feels colder'
					: temp < feels_like
						? 'feels wormer'
						: temp === feels_like && 'feels same',
		};
	},
);

export const selectUvi = createSelector(
	(state: RootState) => state.weather.data.current.uvi,
	(uvi) => getSvgScale(ScaleType.uvi, uvi),
);

export const selectAqi = createSelector(
	(state: RootState) => state.weather.data.current.air_pollution,
	(air_pollution) => getSvgScale(ScaleType.aqi, air_pollution),
);

export const selectSunPosition = createSelector(
	(state: RootState) => state.weather.data.current.sunrise,
	(state: RootState) => state.weather.data.current.sunset,
	(state: RootState) => state.weather.data.current.dt,
	(state: RootState) => state.weather.data.timezone,
	(sunrise, sunset, dt, timezone) => {
		const { range, value, isDay } = sunDefinition(sunrise, sunset, dt);
		return {
			sunset: new TimeService(sunset, timezone).getTime('hoursAndMinutes').result(),
			sunrise: new TimeService(sunrise, timezone).getTime('hoursAndMinutes').result(),
			range,
			value,
			isDay,
		};
	},
);

export const selectPressure = createSelector(
	(state: RootState) => state.weather.data.current.pressure,
	(pressure) => {
		return pressureDefinition(pressure);
	},
);

export const selectMoonPosition = createSelector(
	(state: RootState) => state.weather.data.daily[0].moon_phase,
	(state: RootState) => state.weather.data.timezone,
	(state: RootState) => state.weather.data.daily[0].moonrise,
	(state: RootState) => state.weather.data.daily[0].moonset,

	(moon_phase, timezone, moonrise, moonset) => {
		let description: 'new moon' | 'full moon' | 'waxing moon' | 'waning moon' | undefined;

		if (moon_phase === 0 || moon_phase === 1) {
			description = 'new moon';
		} else if (moon_phase > 0 && moon_phase <= 0.49) {
			description = 'waxing moon';
		} else if (moon_phase > 0.48 && moon_phase < 0.52) {
			description = 'full moon';
		} else if (moon_phase >= 0.52 && moon_phase < 1) {
			description = 'waning moon';
		} else {
			description = undefined;
		}

		return {
			moonPhase: moon_phase * 160 - 30,
			moonRise: new TimeService(moonrise, timezone).getTime('hoursAndMinutes').result(),
			moonSet: new TimeService(moonset, timezone).getTime('hoursAndMinutes').result(),
			desc: description,
		};
	},
);

export const selectPrecipitation = createSelector(
	(state: RootState) => state.weather.data.minutely,
	(state: RootState) => state.weather.data.timezone,
	(precipitation, timezone) => ({
		precipitation,
		timezone,
	}),
);

export const selectDaily = createSelector(
	(state: RootState) => state.weather.data.daily,
	(state: RootState) => state.weather.data.timezone,
	(state: RootState) => state.user.data.userMetrics,
	(daily, timezone, userMetric) => {
		const minTemp = daily.reduce(
			(min, obj) => (obj.temp.min < min ? obj.temp.min : min),
			daily[0].temp.min,
		);
		const maxTemp = daily.reduce(
			(max, obj) => (obj.temp.max > max ? obj.temp.max : max),
			daily[0].temp.max,
		);

		const convertedMinTemp = MetricConverter.getTemp(minTemp, userMetric, 'short');
		const convertedMaxTemp = MetricConverter.getTemp(maxTemp, userMetric, 'short');
		const coords: { x1: number; x2: number }[] = [];
		const dailyValues = daily.map((item) => {
			const dailyMin = MetricConverter.getTemp(item.temp.min, userMetric, 'short');
			const dailyMax = MetricConverter.getTemp(item.temp.max, userMetric, 'short');

			const day = new TimeService(item.dt, timezone).getWeekday('short').result();
			const icon = item.weather[0].icon;
			coords.push({
				x1: getDailyScaleCoords(
					135,
					convertedMinTemp.value,
					convertedMaxTemp.value,
					dailyMin.value,
				),
				x2: getDailyScaleCoords(
					135,
					convertedMinTemp.value,
					convertedMaxTemp.value,
					dailyMax.value,
				),
			});
			return {
				dailyMin,
				dailyMax,
				day,
				icon,
				coords,
			};
		});
		const colors = getTempritureScale(minTemp, maxTemp);

		return {
			daily,
			dailyValues,
			colors,
		};
	},
);

export const selectDailyPopup = (index: number) =>
	createSelector(
		(state: RootState) => state.weather.data.daily,
		(state: RootState) => state.user.data.userMetrics,
		(state: RootState) => state.weather.data.timezone,
		(daily, userMetric, timezone) => {
			const day = daily[index];
			const calendar = daily.map((item) =>
				new TimeService(item.dt, timezone).getDay('2-digit').result(),
			);
			return {
				calendar,
				...day,
				dt: TimeService,
				dew_point: MetricConverter.getTemp(day.dew_point, userMetric, 'short'),
				feels_like: {
					day: MetricConverter.getTemp(day.feels_like.day, userMetric, 'short'),
					night: MetricConverter.getTemp(day.feels_like.night, userMetric, 'short'),
					eve: MetricConverter.getTemp(day.feels_like.eve, userMetric, 'short'),
					morn: MetricConverter.getTemp(day.feels_like.morn, userMetric, 'short'),
				},
				temp: {
					day: MetricConverter.getTemp(day.temp.day, userMetric, 'short'),
					min: MetricConverter.getTemp(day.temp.min, userMetric, 'short'),
					max: MetricConverter.getTemp(day.temp.max, userMetric, 'short'),
					night: MetricConverter.getTemp(day.temp.night, userMetric, 'short'),
					eve: MetricConverter.getTemp(day.temp.eve, userMetric, 'short'),
					morn: MetricConverter.getTemp(day.temp.morn, userMetric, 'short'),
				},
			};
		},
	);

export const selectPopupCalendar = createSelector(
	(state: RootState) => state.weather.data.daily,
	(state: RootState) => state.weather.data.timezone,
	(calendar, timezone) => {
		const calendarItems = calendar.map((day) => {
			const timeService = new TimeService(day.dt, timezone);
			const days = timeService.getDay('2-digit').result();
			const fullDate = timeService
				.getWeekday('short')
				.addDivider('space')
				.getDay('2-digit')
				.addDivider('coma')
				.getMonth('short')
				.addDivider('space')
				.getYear('numeric')
				.result();
			return {
				days,
				fullDate,
			};
		});
		return calendarItems;
	},
);

export const selectPopupMainWeather = (value: number) =>
	createSelector(
		(state: RootState) => state.weather.data.daily,
		(state: RootState) => state.user.data.userMetrics,
		(
			daily,
			userMetric,
		): {
			max: MetricReturnType;
			min: MetricReturnType;
			condition: string;
			icon: string;
		} => {
			return {
				max: MetricConverter.getTemp(daily[value].temp.max, userMetric, 'full'),
				min: MetricConverter.getTemp(daily[value].temp.min, userMetric, 'full'),
				condition: daily[value].weather[0].main,
				icon: daily[value].weather[0].icon,
			};
		},
	);

export const selectPopupScale = (value: number) =>
	createSelector(
		(state: RootState) => state.weather.data.daily,
		(state: RootState) => state.user.data.userMetrics,
		(state: RootState) => state.weather.data.timezone,
		(dailyTemp, userMetrics) => {
			const dailyTempArray = dailyTemp.map((item, index) => {
				return {
					night: item.temp.night,
					morn: item.temp.morn,
					day: item.temp.day,
					eve: item.temp.eve,
					nextNight: dailyTemp[index + 1]
						? dailyTemp[index + 1].temp.night
						: item.temp.night,
				};
			});

			const popupWeatherScale = new PopupWeatherScaleService(
				dailyTempArray,
				userMetrics,
				value,
			);

			return {
				curve: popupWeatherScale.drawCurve(),
				scale: popupWeatherScale.getScale(),
				desc: popupWeatherScale.getDescription(),
				data: popupWeatherScale.getExpandedValues(),
				hoverRect: popupWeatherScale.getHoverRect(),
			};
		},
	);

export const selectPopupDailyDetails = (value: number) =>
	createSelector(
		(state: RootState) => state.weather.data.daily[value],
		(state: RootState) => state.user.data.userMetrics,
		(dayDetails, userMetric) => {
			dayDetails.clouds;
			return {
				uvi: dayDetails.uvi,
				wind: {
					direction: getWindDirection(dayDetails.wind_deg, 'full'),
					speed: MetricConverter.getSpeed(dayDetails.wind_speed, userMetric, true),
					gust: dayDetails.wind_gust
						? MetricConverter.getSpeed(dayDetails.wind_gust, userMetric, true)
						: undefined,
				},
				pressure: dayDetails.pressure,
				precipitation: {
					pop: dayDetails.pop * 100,
					snow: dayDetails.snow,
					rain: dayDetails.rain,
				},
				humidity: dayDetails.humidity,
				clouds: dayDetails.clouds,
				summary: dayDetails.summary,
			};
		},
	);

export default weatherSlice.reducer;
