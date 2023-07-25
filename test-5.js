import './EditDriver.css';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonText,
  IonToolbar,
  IonToggle,
} from '@ionic/react';
import { CarCard } from './CarCard';
import { AddCar } from './AddCar';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { DRIVER_EDIT } from '../mutations/driverEdit';
import { DRIVER_MAKE_OWN } from '../mutations/driverMakeOwn';
import { PHONE_VERIFICATION_REQUEST } from '../mutations/phoneVerificationRequest';
import { ConfirmNumber } from './ConfirmNumber';
import { EditDriverIdentityCardProps } from './__generated__/graphql-types.gen';
import { backgrounds } from './utils/background';
import { getStyles } from './utils/getStyles';
import { PhoneInput } from './MobileInfo';
import { Car, Card } from '../api/APIResponseType'

export const EditDriver: FC<EditDriverIdentityCardProps> = ({
  isOpen,
  onClose,
  driver,
  refetch,
  phoneNumber,
}) => {
  const [showPopoverCar, setShowPopoverCar] = useState(false);
  const [name, setName] = useState(driver && driver.name);
  const [driverPhoneNumber, setDriverPhoneNumber] = useState(phoneNumber);
  const [phoneRequestAnswer, setPhoneRequestAnswer] = useState({});
  const [showPhonePopover, setShowPhonePopover] = useState(false);
  const [selectedBackgroundColorIndex, setSelectedBackgroundColorIndex] = useState(
    backgrounds.findIndex(
      (color) =>
        color.backgroundColors.start === driver.cardAppearance.backgroundColors.start &&
        color.backgroundColors.end === driver.cardAppearance.backgroundColors.end,
    ),
  );

  const [toggleDriverOwn, setToggleDriverOwn] = useState(false);
  const [driverEdit] = useMutation(DRIVER_EDIT);
  const [driverMakeOwn] = useMutation(DRIVER_MAKE_OWN);
  const [phoneVerificationRequest] = useMutation(PHONE_VERIFICATION_REQUEST);

  const handleSetName = (e: any) => setName(e.target.value);

  const handleSetDriverPhoneNumber = (e: any) => setDriverPhoneNumber(e.target.value);

  const handleButtonClick = (index: number) => {
    setSelectedBackgroundColorIndex(index);
  };

  const cars = useMemo(() => driver && driver.cars, [driver]);

  const changeDriverInfo = useCallback(async () => {
    try {
      await driverEdit({
        variables: {
          input: {
            driverId: driver.id,
            name: name,
            cardAppearance: {
              backgroundDark: backgrounds[selectedBackgroundColorIndex].backgroundDark,
              backgroundColors: {
                start: backgrounds[selectedBackgroundColorIndex].backgroundColors.start,
                end: backgrounds[selectedBackgroundColorIndex].backgroundColors.end,
              },
            },
          },
        },
      });
      await refetch();
      onClose();
    } catch (e) {
      console.log(e);
    }
  }, [driver.id, driverEdit, name, onClose, refetch, selectedBackgroundColorIndex]);

  const makeDriverOwn = useCallback(async () => {
    try {
      await driverMakeOwn({
        variables: {
          input: {
            driverId: driver.id,
          },
        },
      });
      await refetch();
      onClose();
    } catch (e) {
      // TODO: add error displaying logic
      console.log(e);
    }
  }, [driver.id, driverMakeOwn, onClose, refetch]);

  const handleToggle = (e) => {
    setToggleDriverOwn(true);
  };

  const getPhoneRequest = useCallback(async () => {
    try {
      const data = await phoneVerificationRequest({
        variables: {
          input: {
            phoneNumber: driverPhoneNumber.replace(/[()]/g, '').replace(/\s/g, ''),
          },
        },
      });
      setPhoneRequestAnswer(data);
    } catch (e) {
      // TODO: add error displaying logic
      console.log(e);
    }
  }, [driverPhoneNumber, phoneVerificationRequest]);

  const defineDriverType = useCallback(() => {
    if (driver.own) {
      if (driverPhoneNumber !== phoneNumber) {
        getPhoneRequest();
        setShowPhonePopover(true);
      } else {
        changeDriverInfo();
      }
    } else {
      if (toggleDriverOwn) {
        makeDriverOwn();
      }
      changeDriverInfo();
    }
  }, [
    changeDriverInfo,
    driver.own,
    driverPhoneNumber,
    getPhoneRequest,
    makeDriverOwn,
    phoneNumber,
    toggleDriverOwn,
  ]);

  return (
    
    <IonModal isOpen={isOpen}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={onClose}>
            <IonIcon class={'edit-driver-close-button'} src="/img/close-button-icon_3x.svg" />
          </IonButton>
        </IonButtons>
        <IonButtons slot="primary">
          <IonButton className={'edit-driver-save-button'} onClick={defineDriverType}>
            Сохранить  {/* Save */}
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent class="ion-justify-content-start">
        <IonRow className={'edit-driver-title'}>
          <p>Личные данные</p> {/* Personal Info */}
        </IonRow>
        <IonRow class="ion-justify-content-between ion-align-items-center">
          <IonCol size="2">
            <div className="circle" />
          </IonCol>
          <IonCol size="9">
            <IonItem class={'edit-driver-items'}>
              <IonInput
                className="edit-driver__input-name"
                onChange={handleSetName}
                value={name}
                onIonInput={(e) => setName(e.target.value)}
              />
            </IonItem>
            <IonItem class={'edit-driver-items'}>
              <IonInput
                className={'edit-driver-placeholder'}
                disabled    
                placeholder={driver.iinNumber}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonGrid fixed>
          <IonRow>
            {driver.own ? (
              <IonItem className="edit__input">
                <IonIcon
                  slot="start"
                  src="/img/settings-phone-icon_3x.svg"
                  className="icon-phone"
                />
                {driverPhoneNumber && (
                  <PhoneInput
                    onChange={handleSetDriverPhoneNumber}
                    value={driverPhoneNumber}
                    onInput={(e) => setDriverPhoneNumber(e.target.value)}
                  />
                )}
                <IonIcon src="/img/edit-icon_3x.svg" className="icon-disclosure" />
              </IonItem>
            ) : (
              <IonRow class={'edit-driver-iin-row'}>
                <IonItem className={'edit-driver-items-iin'} lines={'none'}>
                  <IonIcon
                    slot="start"
                    class={'edit-driver-star'}
                    src={'/img/settings-why-trust-us-icon.svg'}
                  />
                  <IonLabel className="ion-text-wrap edit-driver-my-iin">
                    <h2>Мой ИИН</h2>
                    <p>
                      Это карточка будет являться вашей личной, и находиться всегда вверху списка
                    </p>
                  </IonLabel>
                  <IonToggle
                    className="edit-driver-toggle"
                    checked={false}
                    color="warning"
                    onIonChange={(e) => handleToggle(e)}
                  />
                </IonItem>
              </IonRow>
            )}
          </IonRow>
        </IonGrid>
        <IonRow className={'edit-driver-title edit-top'}>
          <p> Фон для карточки</p>
        </IonRow>
        <IonRow class="ion-align-items-center">
          {backgrounds.map((color, index: number) => (
            <button
              className="card-color"
              style={getStyles(index, selectedBackgroundColorIndex)}
              onClick={() => handleButtonClick(index)}
            />
          ))}
        </IonRow>
        <IonRow className={'edit-driver-title edit-top'}>
          <p>Личные данные</p>
        </IonRow>
        <IonRow>
          {cars &&
            cars.map((car: Car, carCard: Card) => (
              <CarCard key={carCard} car={car} refetch={refetch} driver={driver} />
            ))}
        </IonRow>
        <IonItem class="ion-justify-content-between edit-driver-items">
          <button className="edit-driver-button" onClick={() => setShowPopoverCar(true)}>
            <IonText>
              <p className="add-auto__text">Добавить авто</p>
            </IonText>
            <IonIcon slot="end" src="/img/plus-icon_3x.svg" className="add-auto__logo" />
          </button>
        </IonItem>
        <IonItem lines="none" className={'edit-driver-space'}></IonItem>
      </IonContent>

      <AddCar
        isOpen={showPopoverCar}
        onClose={() => setShowPopoverCar(false)}
        refetch={refetch}
        driver={driver}
      />
      <ConfirmNumber
        isOpen={showPhonePopover}
        onClose={onClose}
        refetch={refetch}
        phoneRequest={phoneRequestAnswer}
        phoneNumber={driverPhoneNumber}
        closePhonePopover={onClose}
      />
    </IonModal>
  );
};
