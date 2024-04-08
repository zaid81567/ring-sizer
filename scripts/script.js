let hasCaliberated = false;
const coin_size = 20; //in mm
let mm_per_px;

// ==========VARIABLES======================================
const ring_el = document.getElementById("ring");
const calib_el = document.getElementById("calibiration-msg");
const btn_el = document.getElementById("calibirate-btn");
const range_el = document.getElementById("range");
const measurementVal_el_d = document.getElementById("measurement-val-diameter");
const measurementVal_el_c = document.getElementById(
  "measurement-val-circumference"
);
const recalibrate_btn = document.getElementById("recalibrate-btn");
const setting_btn = document.getElementById("setting");
const modal_container_el = document.getElementById("modal-container");

// ======localStorage===================================

if (localStorage.getItem("mmPerPx")) {
  hasCaliberated = true;
  mm_per_px = localStorage.getItem("mmPerPx");
  btn_el.style.display = "none";
  calib_el.style.display = "none";
}

// ========EVENT_HANDLERS=================================

// handle setting and recalibration
setting_btn.addEventListener("click", (event) => {
  modal_container_el.style.display = "flex";
  const handleClickOnModal = (event) => {
    modal_container_el.style.display = "none";
    modal_container_el.removeEventListener("click", handleClickOnModal);
  };
  modal_container_el.addEventListener("click", handleClickOnModal);
});

recalibrate_btn.addEventListener("click", (event) => {
  event.stopPropagation();

  if (localStorage.getItem("mmPerPx")) {
    localStorage.removeItem("mmPerPx");

    // reappearing btns and calibration msg
    calib_el.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
    calib_el.classList.remove("no-opacity");
    btn_el.textContent = "Calibrate Now";
    btn_el.classList.remove("btn-transition");
    mm_per_px = 0.0;
    measurementVal_el_d.textContent = "0.00";
    measurementVal_el_c.textContent = "0.00";
    btn_el.disabled = false;
  }
});

//handle calibiration on click
btn_el.addEventListener("click", (event) => {
  //   console.log("clicked");
  //   console.log(range_el.value);
  //   console.log(ring_el.clientWidth);

  //8 extra compensating for border => 4px on both side
  mm_per_px = 20 / (ring_el.clientWidth + 8);
  hasCaliberated = true;
  localStorage.setItem("mmPerPx", mm_per_px);

  // subtle transitions
  calib_el.style.backgroundColor = "yellowgreen";
  calib_el.classList.add("no-opacity");
  btn_el.textContent = "Calibrated!";
  btn_el.classList.add("btn-transition");
  btn_el.disabled = true;
});

//handle circle size using range input
range_el.addEventListener("input", (event) => {
  ring_el.style.height = event.target.value + "px";
  ring_el.style.width = event.target.value + "px";

  if (hasCaliberated) {
    measurementVal_el_d.textContent = getRingDiameter();
    measurementVal_el_c.textContent = getRingCircumference();
  }
});

// ==========FUNTCTIONS====================================
function getRingDiameter() {
  if (hasCaliberated) {
    return (mm_per_px * (ring_el.clientWidth + 8)).toFixed(2);
  }
}

function getRingCircumference() {
  if (hasCaliberated) {
    // diameter * pie = circumeference (in mm)
    return (mm_per_px * (ring_el.clientWidth + 8) * 3.14).toFixed(2);
  }
}
