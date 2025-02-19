/* eslint-disable */
const stripe = Stripe(
  'pk_test_51QtrlLCAdScXBIXuvufaIAtsaJEHugkPyB4EwLyJ5Vao5IsngtaNKpWK0MpQG4CMwBqIDfXtIxogp2PGd5phF4uW00R70UgugL',
);

const bookBtn = document.getElementById('book-tour');

const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session form API /checkout-session/:tourId
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);
    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

if (bookBtn) {
  console.log('da');
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const tourId = e.target.dataset.tourId;
    bookTour(tourId);
  });
}
