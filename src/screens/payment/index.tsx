import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PageWrapper } from '../../components/globals/styles';
import Stepper, { Steps } from '../../components/checkout/Stepper';
import usePayment from './hooks/usePayment';
import Info from './components/Info';
import PaymentType from './components/Options';
import ReturnButton from '../../components/navigation/ReturnButton';
import { Container } from '../../components/checkout/Actions';
import PaymentDialog from './components/Dialog';
import { PrimaryButton } from '../../components/form/Button';
import { Severity, SnackbarContext } from '../../context/Snackbar';
import AppBar from '../../components/checkout/AppBar';

const TIMEOUT_REDIRECT = 3000;

const Payment: FC = () => {
  const payment = usePayment();
  const snackbar = useContext(SnackbarContext);
  const [shouldShowPaymentDialog, setsShouldShowPaymentDialog] = useState(
    false,
  );
  const history = useHistory();

  const handleOpen = () => setsShouldShowPaymentDialog(true);

  const handleClose = (isPaymentSuccessful: boolean) => {
    setsShouldShowPaymentDialog(false);
    const snackbarMessage = isPaymentSuccessful
      ? 'Pagamento efetuado com sucesso'
      : 'Erro ao efetuar pagamento';
    const snackbarSeverity = isPaymentSuccessful
      ? Severity.SUCCESS
      : Severity.ERROR;
    snackbar?.setMessage(snackbarMessage);
    snackbar?.setSeverity(snackbarSeverity);
    snackbar?.setDuration(TIMEOUT_REDIRECT);
    snackbar?.setIsVisible(true);

    if (isPaymentSuccessful) {
      setTimeout(() => {
        snackbar?.setIsVisible(false);
        history.push('/filling');
      }, TIMEOUT_REDIRECT);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout();
    };
  });

  return (
    <PageWrapper>
      <AppBar />
      <Stepper activeStep={Steps.PAYMENT} />
      <Info payment={payment} />
      <PaymentType price={payment?.price || 0} />
      {shouldShowPaymentDialog ? <PaymentDialog onClose={handleClose} /> : null}
      <Container>
        <ReturnButton label='Voltar' url='/volumes' />
        <PrimaryButton onClick={handleOpen}>Pagar</PrimaryButton>
      </Container>
    </PageWrapper>
  );
};

export default Payment;
