import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";

import { doc, setDoc} from "firebase/firestore";

import { auth, db } from "../firebase";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const profileRef = useRef(null);


  const [user, setUser] = useState(null);

  const [newName, setNewName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const getNavClass = ({ isActive }) =>
    `nav__item ${isActive ? "nav__item--active" : ""}`;

  const handleMenuClick = (modalName) => {
    setActiveModal(modalName);
    setIsProfileOpen(false); 
    if (modalName === 'settings' && user) {
      setNewName(user.displayName || "");
    }
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
    return () => unsubscribe();
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault(); 

    try {
      if (isRegisterMode) {
   
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

     
        await updateProfile(newUser, { displayName: name });

        await setDoc(doc(db, "users", newUser.uid), {
          name: name,
          email: email,
          role: "founder",
          createdAt: new Date()
        });

        alert("Зареєстровано: " + name);
      } else {
       
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Успішний вхід: " + (userCredential.user.displayName || userCredential.user.email));
      }
      
      
      setActiveModal(null); 
      setName("");
      setEmail(""); 
      setPassword("");
      
    } catch (error) {
      alert("Помилка: " + error.message);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
  
      await updateProfile(user, { displayName: newName });

  
      const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { name: newName }, { merge: true });

  
      setUser({ ...user, displayName: newName });

      alert("Дані успішно оновлено!");
      setActiveModal(null); 
    } catch (error) {
      alert("Помилка оновлення: " + error.message);
    }
  };
  const handleLogoutSubmit = async () => {
    try {
      await signOut(auth);
      setActiveModal(null);
    } catch (error) {
      alert("Помилка виходу: " + error.message);
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <div className="logo">
            <svg className="logo__icon" width="24" height="24" fill="none" stroke="currentColor">
              <use href="/img/icons.svg#icon-rocket"></use>
            </svg>
          </div>
          <h1 className="header__title">Startup Simulator</h1>
        </div>

        <nav className="nav">
          <NavLink to="/" className={getNavClass}>
            <svg className="nav__icon" width="16" height="16" fill="none" stroke="currentColor">
              <use href="/img/icons.svg#icon-rocket"></use>
            </svg>
            <span className="nav__text">Мій стартап</span>
          </NavLink>
          
          <NavLink to="/market" className={getNavClass}>
            <svg className="nav__icon" width="16" height="16" fill="none" stroke="currentColor">
              <use href="/img/icons.svg#icon-trend-up"></use>
            </svg>
            <span className="nav__text">Ринок</span>
          </NavLink>
          
          <NavLink to="/investors" className={getNavClass}>
            <svg className="nav__icon" width="16" height="16" fill="none" stroke="currentColor">
              <use href="/img/icons.svg#icon-user"></use>
            </svg>
            <span className="nav__text">Інвестори</span>
          </NavLink>

          <div className="profile-btn__container" style={{ position: "relative" }} ref={profileRef}>
            <button 
              className="profile-btn" 
              type="button" 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor">
                <use href="/img/icons.svg#icon-user"></use>
              </svg>
              Профіль
            </button>

            <div className={`profile__dropdown ${isProfileOpen ? "is-open" : ""}`}>
          
              <div className="profile__header">
                <span className="profile__name">{user ? (user.displayName || "Користувач") : "Гість"}</span>
                <span className="profile__email">{user ? user.email : "Неавторизовано"}</span>
              </div>
              
              <ul className="profile__menu">
                
                {user && (
                  <li>
                    <button className="profile__menu-item" type="button" onClick={() => handleMenuClick("settings")}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Налаштування акаунту
                    </button>
                  </li>
                )}

                
                {!user && (
                  <li>
                    <button className="profile__menu-item" type="button" onClick={() => handleMenuClick("login")}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                      </svg>
                      Ввійти в акаунт
                    </button>
                  </li>
                )}
                
                <li className="profile__divider"></li>
                
                
                {user && (
                  <li>
                    <button className="profile__menu-item profile__menu-item--danger" type="button" onClick={() => handleMenuClick("logout")}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      Вийти
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>

     
      {activeModal && (
        <div className="modal-overlay"> 
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

          
          {activeModal === 'settings' && (
              <form onSubmit={handleUpdateProfile}>
                <h3 className="modal-title">Налаштування акаунту</h3>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Ім'я користувача </label>
                    <input 
                      type="text" 
                      className="modal-input" 
                      value={newName} 
                      onChange={(e) => setNewName(e.target.value)}
                      required
                    />
                  </div>
                  
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn--outline" onClick={() => setActiveModal(null)}>Скасувати</button>
                  <button type="submit" className="btn btn--primary">Зберегти зміни</button>
                </div>
              </form>
            )}

        
            {activeModal === 'login' && (
              <>
                <h3 className="modal-title">{isRegisterMode ? "Реєстрація" : "Вхід в систему"}</h3>
            
                <form onSubmit={handleAuthSubmit}>
                  <div className="modal-body">
                    
                    {isRegisterMode && (
                      <div className="form-group">
                        <label>Ім'я (або назва стартапу)</label>
                        <input 
                          type="text" 
                          className="modal-input" 
                          placeholder="Ваше ім'я" 
                          value={name} 
                          onChange={(e)=> setName(e.target.value)} 
                          required 
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        className="modal-input" 
                        placeholder="mail@example.com" 
                        value={email} 
                        onChange={(e)=> setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Пароль</label>
                      <input 
                        type="password" 
                        className="modal-input" 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e)=> setPassword(e.target.value)} 
                        required 
                        minLength="6" 
                      />
                    </div>
                  </div>
                  
                  <div className="modal-footer" style={{ flexDirection: 'column', gap: '8px' }}>
                    <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
                      {isRegisterMode ? "Зареєструватися" : "Увійти"}
                    </button>
                
                    <button 
                      type="button" 
                      className="btn btn--outline" 
                      style={{ width: '100%', border: 'none', color: '#7c3aed' }}
                      onClick={() => setIsRegisterMode(!isRegisterMode)}
                    >
                      {isRegisterMode ? "Вже є акаунт? Увійти" : "Немає акаунту? Створити"}
                    </button>
                  </div>
                </form>
              </>
            )}

       
            {activeModal === 'logout' && (
              <>
                <h3 className="modal-title">Вихід з акаунту</h3>
                <div className="modal-body">
                  <p style={{ color: '#475569', margin: 0 }}>Ви дійсно хочете вийти зі свого акаунту? Ваші незбережені дані можуть бути втрачені.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn--outline" onClick={() => setActiveModal(null)}>Скасувати</button>
                  <button className="btn btn--danger" onClick={handleLogoutSubmit}>Так, вийти</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;