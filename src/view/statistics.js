import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import {COUNT_MILISECONDS_SECOND, COUNT_SECONDS_MINUTE, COUNT_MINUTES_HOUR, COUNT_HOURS_DAY} from '../const.js';
import {getFormatDuration} from '../utils/common.js';
import SmartView from './smart.js';
import TripOffersModel from '../model/offers.js';

const BAR_HEIGHT = 55;

const StatisticsType = {
  MONEY: 'money',
  TYPE: 'type',
  TIMESPEND: 'time-spend',
};

const createStatisticsTemplate = () => {

  const getItemTemplate = (id) => `<div class="statistics__item"><canvas class="statistics__chart" id="${id}" width="900"></canvas></div>`;

  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    ${Object.values(StatisticsType).map((item) => getItemTemplate(item)).join('')}
  </section>`;
};

export default class Statistics extends SmartView {
  constructor(points) {
    super();

    this._points = points.slice();
    this._types = null;
    this._costs = null;

    this._moneyCtx = null;
    this._typeCtx = null;
    this._timeSpendCtx = null;

    this._setDataCharts();
    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._points);
  }

  removeElement() {
    super.removeElement();
  }

  _setDataCharts() {

    this._types = [...TripOffersModel.getTypesOffers()];

    this._costs = this._types.map((type) => {
      const filteredPoints = this._points.filter((point) => point.typePoint === type.toLowerCase());
      return filteredPoints.reduce((sum, point) => sum + Number(point.price), 0);
    });

    this._count = this._types.map((type) => {
      const filteredPoints = this._points.filter((point) => point.typePoint === type.toLowerCase());
      return filteredPoints.length;
    });

    this._timeSpend = this._types.map((type) => {
      const filteredPoints = this._points.filter((point) => point.typePoint === type.toLowerCase());

      let sumMillisecond = 0;

      filteredPoints.forEach((point) => {
        const dateFrom = dayjs(point.startDateTime);
        const dateTo = dayjs(point.endDateTime);

        const diffMillisecond = dateTo.diff(dateFrom);
        sumMillisecond += diffMillisecond;
      });

      return sumMillisecond;
    });
  }

  _setCharts() {
    this._setMoneyChart();
    this._setTypeChart();
    this._setTimeSpendChart();
  }

  _setMoneyChart() {
    this._moneyCtx = this.getElement().querySelector('#money');
    this._moneyCtx.height = BAR_HEIGHT * (this._types.length - 1);

    new Chart(this._moneyCtx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: [...this._types],
        datasets: [{
          data: [...this._costs],
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13,
            },
            color: '#000000',
            anchor: 'end',
            align: 'start',
            formatter: (val) => `€ ${val}`,
          },
        },
        title: {
          display: true,
          text: 'MONEY',
          fontColor: '#000000',
          fontSize: 23,
          position: 'left',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  _setTypeChart() {
    this._typeCtx = this.getElement().querySelector('#type');
    this._typeCtx.height = BAR_HEIGHT * (this._types.length - 1);

    new Chart(this._typeCtx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: [...this._types],
        datasets: [{
          data: [...this._count],
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13,
            },
            color: '#000000',
            anchor: 'end',
            align: 'start',
            formatter: (val) => `${val}x`,
          },
        },
        title: {
          display: true,
          text: 'TYPE',
          fontColor: '#000000',
          fontSize: 23,
          position: 'left',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  _setTimeSpendChart() {
    this._timeSpendCtx = this.getElement().querySelector('#time-spend');
    this._timeSpendCtx.height = BAR_HEIGHT * (this._types.length - 1);

    new Chart(this._timeSpendCtx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: [...this._types],
        datasets: [{
          data: [...this._timeSpend],
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13,
            },
            color: '#000000',
            anchor: 'end',
            align: 'start',
            formatter: (sumMillisecond) => {
              const [days, hours, minutes] = this._normalizeMilisecond(sumMillisecond);
              return getFormatDuration(days, hours, minutes);
            },
          },
        },
        title: {
          display: true,
          text: 'TIME SPEND',
          fontColor: '#000000',
          fontSize: 23,
          position: 'left',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  _normalizeMilisecond(milisecond) {

    const days = Math.floor(milisecond / (COUNT_HOURS_DAY * COUNT_MINUTES_HOUR * COUNT_SECONDS_MINUTE * COUNT_MILISECONDS_SECOND));
    const hours = Math.floor(milisecond / (COUNT_MINUTES_HOUR * COUNT_SECONDS_MINUTE * COUNT_MILISECONDS_SECOND)) - days * COUNT_HOURS_DAY;
    const minutes = Math.floor(milisecond / (COUNT_SECONDS_MINUTE * COUNT_MILISECONDS_SECOND)) - hours * COUNT_MINUTES_HOUR - days * COUNT_HOURS_DAY * COUNT_MINUTES_HOUR;

    return [
      days,
      hours,
      minutes,
    ];
  }
}
