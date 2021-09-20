import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import {BAR_HEIGHT} from '../const.js';
import SmartView from './smart.js';
import TripOffersModel from '../model/offers.js';

const createStatisticsTemplate = () => {
  return `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="money" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="type" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
  </div>
</section>`;
};

export default class Statistics extends SmartView {
  constructor() {
    super();

    this._points = null;
    this._types = null;
    this._costs = null;

    this._moneyCtx = null;
    this._moneyChart = null;

    this._typeCtx = null;
    this._typeChart = null;

    this._timeSpendCtx = null;
    this._timeSpendChart = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._points);
  }

  removeElement() {
    super.removeElement();
  }

  restoreHandlers() {

  }

  show(points) {

    this._points = points.slice();
    this._types = [...TripOffersModel.getTypesOffers()];

    this._cost = this._types.map((type) => {
      const points = this._points.filter((point) => point.typePoint === type.toLowerCase());
      return points.reduce((sum, point) => sum + Number(point.price), 0);
    });

    this._count = this._types.map((type) => {
      const points = this._points.filter((point) => point.typePoint === type.toLowerCase());
      return points.length;
    });

    this._timeSpend = this._types.map((type) => {
      const points = this._points.filter((point) => point.typePoint === type.toLowerCase());
      const date_from = dayjs(points[0].startDateTime);
      const date_to = dayjs(points[0].endDateTime);

      const diffDays = date_to.diff(date_from, 'day');
      const diffHours = date_to.diff(date_from, 'hour');
      const diffMinutes = date_to.diff(date_from, 'minute') - diffHours * 60;

      return [
        diffDays,
        diffHours,
        diffMinutes,
      ];
      
    });

    this._showMoneyChart();
    this._showTypeChart();
    this._showTimeSpendChart();
  }

  _showMoneyChart() {
    this._moneyCtx = document.querySelector('#money');
    this._moneyCtx.height = BAR_HEIGHT * (this._types.length - 1);

    this._moneyChart = new Chart(this._moneyCtx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: [...this._types],
        datasets: [{
          data: [...this._cost],
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

  _showTypeChart() {
    this._typeCtx = document.querySelector('#type');
    this._typeCtx.height = BAR_HEIGHT * (this._types.length - 1);

    this._typeChart = new Chart(this._typeCtx, {
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

  _showTimeSpendChart() {
    this._timeSpendCtx = document.querySelector('#time-spend');
    this._timeSpendCtx.height = BAR_HEIGHT * (this._types.length - 1);

    this._typeChart = new Chart(this._timeSpendCtx, {
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
            formatter: ([diffDays, diffHours, diffMinutes]) => {
              console.log('12' + diffDays);
              return `${diffDays}D ${diffHours}H ${diffMinutes}M`;
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
}
