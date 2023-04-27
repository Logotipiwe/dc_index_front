import RootStore from "./RootStore";
import React from "react";
import {makeAutoObservable} from "mobx";

class PortfStore {
	constructor(RootStore: RootStore) {
		makeAutoObservable(this);
		this.RootStore = RootStore;

		this.onScrollThrottled = this.onScrollThrottled.bind(this);
		this.getTech = this.getTech.bind(this);
	}

	isThrottleScroll = false;
	imgNumShows: number = -1;
	imgOpacity: number = 1;
	galleryClosestItem = 0;

	RootStore: RootStore;

	techs: Tech[] = [
		{title: 'ReactJS', img: 'react.png'},
		{title: 'TypeScript', img: 'ts.png'},
		{title: 'SASS'},
		{title: 'PHP'},
		{title: 'NodeJS', img: 'node.png'},
		{title: 'Docker'},
		{title: 'MobX'},
		{title: 'Git'},
		{title: 'MySQL'},
		{title: 'Mongo'},
		{title: 'Redis'},
		{title: 'JQuery'}
	];

	projects: Project[] = [
		{
			title: "CRM для Courseburg",
			techs: ['PHP', 'Git', 'MySQL', 'JQuery'],
			desc: <>
				В мае 2019-го года начал с нуля писать CRM для бизнеса "Courseburg" с
				использованием <b>JS</b>, <b>CSS</b>, <b>HTML</b>, чистого <b>PHP</b> и <b>MySQL</b>. Система должна принимать
				входящие запросы, содержащие данные заявки от клиента, рассылать уведомления в соц.сети об этой заявке и
				сохранять её в базе. В дальнейшем заявке присваивается статус, комментарий, другая информация. По всем заявкам
				выводится <b>аналитика</b>. Также система хранит информацию о сущностях "Курс" и "Организатор курса".<br/><br/>
				Архитектура системы построена согласно принципам <b>REST</b>. Бекенд и фронтенд в основном
				полностью <b>разделены</b>. В основе бекенда используются класс подключения к БД, класс конфигурации системы,
				класс содержащий все вызываемые методы (вызываемый метод указывается в GET-параметре method и вызывается после
				прохождения запросом авторизации с помощью токена). Фронтенд в качестве внешних библиотек использует
				<b>JQuery</b> и <b>Google Charts</b>.<br/><br/>
				В течение некоторого времени планировалось <b>интегрировать</b> её с сторонним личным кабинетом для
				организаторов курсов, поэтому в системе был полностью написан API для взаимодействия с сущностями, а также
				настроены все запросы к личному кабинету, вызываемые при поступлении заявок или изменении данных в CRM. От
				интеграции пришлось отказаться, поэтому среди моих проектов появилось написание фронтенд приложения <a
				href={"#lk"}>"Личный кабинет организатора Courseburg"</a>.<br/><br/>
				Это мой первый серьёзный проект, разрабатывался в одиночку, без вышестоящих специалистов, с полной свободой
				выбора методов и технологий, лишь с выполнением требований к функционалу системы.
			</>
		},
		{
			title: "Личный кабинет организатора Courseburg",
			techs: ['ReactJS', 'TypeScript', 'SASS', 'MobX', 'PHP', 'Git', 'MySQL', 'JQuery'],
			desc: <>
				В апреле 2020-го года было разработано фронтенд-приложение на TypeScript с использованием библиотеки React,
				стейт-менеджера MobX и препроцессором стилей SASS. Приложение предосавляет для организаторов образовательных
				курсов всю информацию о состоянии заявок, данные заявок, аналитику за периоды, интерфейс для оплаты услуг
				Courseburg.<br/><br/>
				В качестве бекенда к ЛК используется вышеописанная CRM. Все запрошенные с бекенда данные преобразуются в массивы
				объектов, а в классах-хранилищах MobX описаны функции взаимодействия с ними, а также различные вычисляемые
				значения (например, массив клиентов которые прошли курс и ожидают оплаты).<br/><br/>
				В главном меню страницы 4 пункта: "Мои заявки", "Мои курсы", "Аналитика" и "Финансы".<br/>
				<div className='text-img'>
					<img src='index/img/lkmain.png' className='img'/><p className='desc'>Меню в личном кабинете Courseburg</p>
				</div>
				<div className='text-img'>
					<img src='index/img/lkcl.png' className='img'/><p className='desc'>Страница с заявками в личном кабинете</p>
				</div>
				<div className='text-img'>
					<img src='index/img/lkanal.png' className='img'/><p className='desc'>Аналитика в личном кабинете</p>
				</div>

			</>
		},
		{
			title: "Приложение для учета расходов \"KeepBalance\"",
			techs: ["ReactJS", "TypeScript", "SASS", "PHP", "NodeJS", "Docker", "MobX", "Git", "MySQL"],
			desc: <>
				<b>Некоммерческое</b> приложение для личного пользования. Всегда хотелось в более удобном виде и в меньших
				числах считать свое <b>финансовое состояние</b> и думать, например, не о 9000 в месяц, а о 300 рублях в день,
				иначе можно расходовать деньги неравномерно. Аналогов с именно таким функционалом среди приложений <b>не
				нашлось</b>, поэтому писал его самостоятельно. В 2016-м году для этого я использовал <b>Excel</b>, в июле
				2019-го было написано приложение на <b>React</b>, в начале 2020-го года приложение переписано для
				платформы <b>VKMiniApps</b> с использованием библиотеки визуальных React компонентов "<b>VKUI</b>".<br/><br/>
				Бекенд написан также на <b>чистом PHP</b>, в июле 2020-го переписан на <b>NodeJS</b> с исп. "<b>node-cache</b>"
				и "<b>Redis</b>" в целях изучения данных технологий. На сервере изначально был установлен Apache2, MySQL, PHP,
				однако после подключения NodeJS на сервере был установлен <b>Docker</b>, а все сервисы помещены в контейнеры. В
				качестве веб-сервера, принимающего запросы, был установлен контейнер с <b>Nginx</b>.<br/><br/>
				{/* eslint-disable-next-line react/jsx-no-target-blank */}
				Гит проект фронтенд-приложения: <a href='https://gitlab.com/Logotipiwe/keepbalancevk'
				                                   target='_blank'>https://gitlab.com/Logotipiwe/keepbalancevk</a><br/>
				Сервис доступен в приложении VK в разделе "Мини-приложения" под названием "keepBalance", либо по ссылке <a
				href='https://logotipiwe.ru/keepbalancevk' target='_blank'>https://logotipiwe.ru/keepbalancevk</a>.<br/><br/>
				В приложении сознательно допущены многочисленные неясности в интерфейсе, так как оно не расчитано на широкую
				аудиторию пользователей.<br/>
				<div className='text-img'>
					<img src='index/img/kbmain.png' className='img'/><p className='desc'>Главная страница в keepBalance</p>
				</div>
				<div className='text-img'>
					<img src='index/img/kbanal.png' className='img'/><p className='desc'>Аналитика в keepBalance</p>
				</div>
				<div className='text-img'>
					<img src='index/img/kbtrans.png' className='img'/><p className='desc'>Оформление нового расхода в
					keepBalance</p>
				</div>
			</>
		},
		{
			title: "Сайт logotipiwe.ru",
			techs: ["Docker", "Redis", "PHP", "NodeJS", "MySQL", "Mongo"],
			desc: <>
				Арендованный VPS с приобретенным доменом "logotipiwe.ru". На этом сайте отрабатываю навыки базового
				администрирования сервера, деплоя различных сервисов в продакшен-среду, служит для личного пользования, но в
				основном для обучения интересующим технологиям, таким как Docker, Apache, Nginx, PHP, NodeJS.
			</>
		},
		{
			title: "Данное портфолио",
			techs: ["ReactJS", "MobX", "SASS", "TypeScript"],
			desc: <>
				Эта страница была написана в ленивом режиме в течение двух дней, по несколько часов работы в день. К сожалению, все гит-репозитории с проектами закрыты, поэтому я решил представить всю информацию здесь.
			</>
		}
	];

	gallery: GalleryItem[] = [
		{src: "lkmain.png", desc: "Меню личного кабинета Courseburg"},
		{src: "lkcl.png", desc: "Страница клиентов в личном кабинете"},
		{src: "lkanal.png", desc: "Аналитика в личном кабинете"},
		{src: "kbmain.png", desc: "keepBalance: главный экран"},
		{src: "kbanal.png", desc: "keepBalance: аналитика"},
		{src: "kbtrans.png", desc: "keepBalance: оформление нового расхода"},
	];

	onScrollThrottled() {
		if (this.isThrottleScroll) return;
		else {
			this.isThrottleScroll = true;
			setTimeout(() => {
				this.isThrottleScroll = false;
			}, 10);
		}
		const list = document.getElementById('left-side');
		if (!list) return;

		const height = window.innerHeight;
		const topPos = list.scrollTop;
		const bottomPos = list.scrollTop + height;
		const listHeight = list.scrollHeight;

		const galleryStartPoint = height * 1.4;

		const scrollGalleryHeight = listHeight - galleryStartPoint;

		const galleryItemHeight = scrollGalleryHeight / this.gallery.length;

		const transitionLengthPX = 100;

		const galleryCurrPoint = bottomPos - galleryStartPoint;

		let imgNumShows = Math.floor(galleryCurrPoint / galleryItemHeight);

		if (imgNumShows >= this.gallery.length) imgNumShows = this.gallery.length - 1;
		this.imgNumShows = imgNumShows;

		console.log('-----------------------');
		console.log('Текущий: ' + imgNumShows);
		console.log('Положение: ' + Math.round(galleryCurrPoint));
		const closestOtherItemNum = (galleryCurrPoint % galleryItemHeight < galleryItemHeight / 2)
			? (imgNumShows - 1)
			: (imgNumShows + 1);
		this.galleryClosestItem = closestOtherItemNum;

		const diffWithClosestBorder = galleryItemHeight / 2 - Math.abs((galleryCurrPoint % galleryItemHeight) - galleryItemHeight / 2);
		this.imgOpacity = (diffWithClosestBorder < transitionLengthPX)
			? diffWithClosestBorder / transitionLengthPX
			: 1;
		console.log('rkjptcn ' + closestOtherItemNum);
		console.log('разница2 ' + diffWithClosestBorder);
	}

	getTech(title: TechTitles): TechParsed {
		const tech = this.techs.find(t => t.title === title);
		const img = (tech!.img) ? tech!.img : title.toLowerCase() + '.png';
		return {...tech, img, title};
	}
}

export default PortfStore;
