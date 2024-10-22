"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Calendar,
	CircleGauge,
	MapPinHouse,
	Moon,
	SunSnow,
	Thermometer,
	Wind,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function WeatherForecast() {
	const [dataDzis, setDataDzis] = useState(null);
	const [dataPrzewidywanie, setDataPrzewidywanie] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(
					"https://api.openweathermap.org/data/2.5/weather?lat=52.237049&lon=21.017532&appid=fed27fe200b62ba49c94ac1b95169046&units=metric"
				);
				const dataJson = await response.json();
				setDataDzis(dataJson);
				console.log(dataJson);
			} catch (error) {
				setError(true);
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(
					"https://api.openweathermap.org/data/2.5/forecast?lat=52.237049&lon=21.017532&appid=fed27fe200b62ba49c94ac1b95169046&units=metric"
				);
				const dataJson = await response.json();
				setDataPrzewidywanie(dataJson);
			} catch (error) {
				setError(true);
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);

	function getNightWeather(data) {
		const nightWeather = data.list.find((item) =>
			item.dt_txt.includes("00:00:00")
		);
		return `${nightWeather.main.temp}℃`
	}

	if (loading) {
		return <p>Ładowanie...</p>;
	}

	if (error) {
		return <p>Błąd wczytywania danych pogodowych.</p>;
	}

	return (
		<div>
			<div className="flex justify-center mb-8">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-center gap-2">
							<Thermometer />
							{dataDzis.main.temp}℃
						</CardTitle>
					</CardHeader>
					<CardContent className="text-center space-y-4">
            <Calendar />
						{new Date().toISOString().slice(0, 10)}
						<div className="text-lg flex items-center justify-center gap-2">
							<SunSnow />
							{dataDzis.weather[0].description}
						</div>
						<div className="text-lg flex items-center justify-center gap-2">
							<Wind />
							{dataDzis.wind.speed} km/h
						</div>
						<div className="text-lg flex items-center justify-center gap-2">
							<MapPinHouse />
							{dataDzis.name}
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex flex-wrap justify-center gap-4">
				{dataPrzewidywanie &&
					dataPrzewidywanie.list.map(
						(weather, idx) =>
							(idx == 0 || idx % 8 == 0) && (
								<Card key={idx}>
									<CardHeader>
										<CardTitle className="text-xl flex items-center justify-center gap-2">
											<Thermometer />
											{weather.main.temp}℃
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4 text-center">
										<div className="text-lg flex items-center justify-center gap-2">
											<Calendar />
											{weather.dt_txt.slice(0, 10)}
										</div>
										<div className="text-lg flex items-center justify-center gap-2">
											<Moon />
											Temperatura Nocą: {getNightWeather(dataPrzewidywanie)}
										</div>
										<div className="text-lg flex items-center justify-center gap-2">
											<CircleGauge />
											{weather.main.pressure} hPa
										</div>
									</CardContent>
								</Card>
							)
					)}
			</div>
		</div>
	);
}


// https://openweathermap.org