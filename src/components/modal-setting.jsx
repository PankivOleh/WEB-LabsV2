import { useState } from "react";


const ModalSettings = ({ companyData, onSave }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault(); 
const newData = {
    name: document.getElementById("company-name").value,
    industry: document.getElementById("company-industry").value,
    employee: Number(document.getElementById("employees").value),
    region: document.getElementById("markets").value, 
    offices: document.getElementById("offices").value,
};
        onSave(newData);
        
        setIsOpen(false);
    };
    return (
        <div>
            <button className="modal-button button button--primary" id="ModalOpenButton" onClick={()=>setIsOpen(true)}>
              <svg
                className="button__icon"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
              >
                <use href="/img/icons.svg#icon-edit"></use>
              </svg>
              Редагувати
            </button>
        
            <div className={`modal-setting__backdrop ${isOpen?"":"visualy-hidden"} `}>
      <div className="modal-setting">
        <div className="modal-setting__header">
          <h2 className="modal-setting__title">Налаштування стартапу</h2>
          <button
            className="modal-button modal-setting__close"
            type="button"
                            aria-label="Закрити"
                            onClick={()=>setIsOpen(false)}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor">
              <use href="/img/icons.svg#icon-close"></use>
            </svg>
          </button>
        </div>

        <form className="modal-setting__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-group__label" htmlFor="company-name"
              >Назва компанії</label
            >
            <input
              className="form-group__input"
              type="text"
              id="company-name"
              defaultValue={companyData.name}
            />
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="company-industry"
              >Сфера діяльності</label
            >
            <div className="form-group__select-wrapper">
              <select className="form-group__select" id="company-industry" defaultValue={companyData.industry}>
                <option value="tech" selected>Технології</option>
                <option value="fintech">Фінтех</option>
                <option value="ecommerce">E-commerce</option>
                <option value="health">Здоров'я</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="employees"
              >Кількість працівників</label
            >
            <input
              className="form-group__input"
              type="number"
              id="employees"
              defaultValue={companyData.employee}
            />
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="markets">Ринки збуту</label>
            <input
              className="form-group__input"
              type="text"
              id="markets"
              defaultValue={companyData.region}
            />
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="offices">Офіси</label>
            <input
              className="form-group__input"
              type="text"
              id="offices"
              defaultValue={companyData.offices}
            />
          </div>

          <div className="modal-setting__footer">
            <button
              className="modal-setting__button button button--primary button--full"
                                type="submit"
                                onClick={()=>handleSubmit()}
            >
              Зберегти
            </button>
          </div>
        </form>
      </div>
            </div>
            </div>
    )
}
export default ModalSettings;
 