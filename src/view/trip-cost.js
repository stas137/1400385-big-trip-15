const tripCost = (points = {}) => {
  const {length = 0} = points;

  if (!length) {
    return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
    </p>`;
  }

  const costTrip = points.reduce((sum, item) => sum + Number(item.price), 0);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${costTrip}</span>
    </p>`;
};

export {tripCost};
