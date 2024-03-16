class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.driver = document.getElementById("driver");
    this.date = document.getElementById("date");
    this.time = document.getElementById("time");
    this.passenger = document.getElementById("passenger");
    this.search = document.getElementById("search");
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;

    this.search.onclick = this.searcs;
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add("col-lg-4", "my-2", "d-flex");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
    console.log("Loaded cars" + cars[1])
  }

  async filterCar() {
    const filteredCars = await Binar.listCars(car => {
      console.log("Cars Data");
      console.log("Driver type: " + this.driver.value);
      console.log("Date: " + this.date.value);
      console.log("Time: " + this.time.value);

      const dateValue = this.date.value;
      const timeValue = this.time.value;

      const formattedTime = `${timeValue}:00`;
      const dateTimeString = `${dateValue}T${formattedTime}`;
      const dateTime = new Date(dateTimeString).getTime();

      const selectedPassenger = parseInt(this.passenger.value) || 0;

      console.log("Passenger: " + selectedPassenger);

      if (selectedPassenger !== '' || selectedPassenger !== '0') {
        const availableDate = new Date(car.availableAt).getTime();
        const cars = car.capacity >= selectedPassenger && car.available === true && availableDate >= dateTime;
        return cars
      } else {
        const cars = car.available === true && availableDate >= dateTime;
        return cars;
      }

    });
    Car.init(filteredCars);
  }
  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
