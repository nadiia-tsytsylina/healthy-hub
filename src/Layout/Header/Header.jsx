import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getAuthStatus, getUserInfo } from 'redux/auth/selectors';
import { getCurrentDate } from 'utils/currentDate';

import HeaderModalButton from './HeaderModalButton/HeaderModalButton';
import MobileMenu from './MobileMenu/MobileMenu';
import TargetSelectionModal from './TargetSelectionModal/TargetSelectionModal';
import CurrentWeightModal from './CurrentWeightModal/CurrentWeightModal';
import UserInfoModal from './UserInfoModal/UserInfoModal';
import {
  HeaderContainer,
  LogoNavContainer,
  Logo,
  Container,
  Navigation,
  StyledLink,
  ProfileSvg,
  AuthContainer,
  MenuButton,
  MenuSvg,
  HeaderButtonContainer,
  UserName,
  UserInfoButton,
  UserSvg,
  UserAvatar,
} from './Header.styled';

import sprite from '../../assets/images/icons/icons.svg';

const Header = () => {
  const isAuth = useSelector(getAuthStatus);
  const user = useSelector(getUserInfo);
  const avatar = user.avatarURL;
  const gender = user.gender.toLowerCase();
  const goal = user.goal.toLowerCase();
  const weight = user.weight;
  const name = user.name;
  const [today, setToday] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    if (showMobileMenu || showTargetModal || showWeightModal || showUserModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileMenu, showTargetModal, showWeightModal, showUserModal]);

  const openMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowUserModal(false);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const openTargetModal = () => {
    setShowTargetModal(!showTargetModal);
    setShowMobileMenu(false);
    setShowWeightModal(false);
    setShowUserModal(false);
  };

  const closeTargetModal = () => {
    setShowTargetModal(false);
  };

  const openWeightModal = () => {
    setToday(getCurrentDate());
    setShowWeightModal(!showWeightModal);
    setShowMobileMenu(false);
    setShowTargetModal(false);
    setShowUserModal(false);
  };

  const closeWeightModal = () => {
    setShowWeightModal(false);
  };

  const openUserModal = () => {
    setShowUserModal(!showUserModal);
    setShowWeightModal(false);
    setShowMobileMenu(false);
    setShowTargetModal(false);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
  };

  return (
    <>
      <HeaderContainer>
        <Container className="container">
          {isAuth ? (
            <LogoNavContainer>
              <Logo to="/">HealthyHub</Logo>
              <MenuButton type="button" onClick={openMobileMenu}>
                <MenuSvg>
                  <use href={sprite + '#icon-menu'} />
                </MenuSvg>
              </MenuButton>
            </LogoNavContainer>
          ) : (
            <Logo to="/">HealthyHub</Logo>
          )}

          {isAuth ? (
            <AuthContainer>
              <HeaderButtonContainer>
                <HeaderModalButton
                  gender={gender}
                  goal={goal}
                  buttonType="goal"
                  onClick={openTargetModal}
                />
                <HeaderModalButton
                  buttonType="weight"
                  weight={weight}
                  onClick={openWeightModal}
                />
              </HeaderButtonContainer>

              <UserInfoButton type="button" onClick={openUserModal}>
                <UserName>{name}</UserName>
                {avatar ? (
                  <UserAvatar src={avatar} alt="user avatar" />
                ) : (
                  <UserSvg>
                    <use href={sprite + '#icon-profile-circle'} />
                  </UserSvg>
                )}

                {showUserModal ? (
                  <svg
                    width="14"
                    height="14"
                    stroke="var(--icon-color-green)"
                    style={{ transform: 'rotate(180deg)' }}
                  >
                    <use href={sprite + '#icon-arrow-down'} />
                  </svg>
                ) : (
                  <svg width="14" height="14" stroke="var(--icon-color-green)">
                    <use href={sprite + '#icon-arrow-down'} />
                  </svg>
                )}
              </UserInfoButton>
            </AuthContainer>
          ) : (
            <Navigation>
              <StyledLink to="/signin">Sign in</StyledLink>
              <span>/</span>
              <StyledLink to="/signup">Sign up</StyledLink>
              <ProfileSvg>
                <use href={sprite + '#icon-profile-circle'} />
              </ProfileSvg>
            </Navigation>
          )}
        </Container>
      </HeaderContainer>
      {showUserModal && <UserInfoModal onClose={closeUserModal} />}
      {showMobileMenu && (
        <MobileMenu
          onClose={closeMobileMenu}
          gender={gender}
          goal={goal}
          weight={weight}
          openTarget={openTargetModal}
          openWeight={openWeightModal}
        />
      )}
      {showTargetModal && (
        <TargetSelectionModal
          gender={gender}
          onClose={closeTargetModal}
          target={goal}
        />
      )}
      {showWeightModal && (
        <CurrentWeightModal onClose={closeWeightModal} date={today} />
      )}
    </>
  );
};

export default Header;
