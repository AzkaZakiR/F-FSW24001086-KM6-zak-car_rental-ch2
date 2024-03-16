class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
    <div class="card px-1 py-3">
    <img src="${this.image}" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title fs-6">${this.manufacture}/${this.model}</h5>
        <h3 class="card-title fs-5 fw-bold">Rp ${this.rentPerDay} / hari</h3>
        <p class="">${this.description}</p>
        <div class="row mb-2">
            <div class="col-1">
                <img src="images/fi_users.png"  alt="" >
            </div>
            <div class="col-lg">
                ${this.capacity} orang
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-1">
                <img src="images/gear.png"alt="" >
            </div>
            <div class="col-lg">
                ${this.transmission}
            </div>
        </div>
        <div class="row mb-3">
        <div class="col-1">
           <img src="images/fi_calendar.png" alt="" srcset="" />
        </div>
        <div class="col-lg">tahun ${this.year}</div>
     </div>

        <a href="#" class="btn btn-success" >Go somewhere</a>
    </div>
</div>
    `;
  }
}
