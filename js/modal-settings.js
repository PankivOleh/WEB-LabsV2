const modalButton = document.querySelectorAll('.modal-button');
const modalSetting = document.querySelector('.modal-setting__backdrop');

modalButton.forEach(button => {
  button.addEventListener('click', () => {
    modalSetting.classList.toggle('visualy-hidden');
  });
});

const applyModalSettings = () => {
  if (localStorage.getItem("settings") === null) {
    return;
  }
  const settings = JSON.parse(localStorage.getItem("settings"));
  document.getElementById("company-name").value = settings.companyName;
  document.getElementById("company-industry").value = settings.industry;
  document.getElementById("employees").value = settings.employees;
  document.getElementById("markets").value = settings.markets;
  document.getElementById("offices").value = settings.offices;
}
applyModalSettings();
