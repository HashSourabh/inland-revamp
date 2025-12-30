"use client";
import React, { useEffect, useState } from "react";
import { HomeIcon, EnvelopeIcon, MapPinIcon, HomeModernIcon, UserCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

interface BuyerData {
  Buyer_ID: number;
  Buyer_Surname: string;
  Buyer_Forename: string;
  Buyer_Contact_Name: string;
  Buyer_Telephone: string;
  Buyer_Email: string;
}

interface PropertyData {
  id: string;
  title: string;
  propertyRef: string;
  price: { current: number; original?: number };
  location: { town: string; province: string };
}

// FIX: Add validation for Stripe key
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export default function ReserveForView() {
  const { user, loading: authLoading, openAuth } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const tCommon = useTranslations('common');
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Get property data from sessionStorage
    const storedProperty = sessionStorage.getItem("propertyData");
    if (storedProperty) {
      setPropertyData(JSON.parse(storedProperty));
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      openAuth('login', { redirectTo: `/${locale}/properties/reserve-for-view` });
    }
  }, [user, authLoading, openAuth, locale]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    const numValue = parseFloat(value);
    if (value && (isNaN(numValue) || numValue < 1000)) {
      setAmountError(tCommon('pleaseEnterAmountAbove1000'));
    } else {
      setAmountError('');
    }
  };

  // Get user information from auth context
  const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "";
  const buyerEmail = user?.email || "";

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (handled in useEffect, but show message here too)
  if (!user) {
    return null; // useEffect will handle redirect
  }

  // FIX: Show error if Stripe key is missing
  if (!stripePromise) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold mb-2">{tCommon('configurationError')}</h2>
          <p className="text-red-600">
            {tCommon('stripeKeyMissing')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading text-3xl font-bold text-primary-600 mb-6">{tCommon('reserveForViewing')}</h1>

      {/* Customer & Property Details */}
      <section className="bg-white rounded-xl p-8 border border-black/10 space-y-6 mb-6 grid grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold text-gray-600 mb-4">{tCommon('customerDetails')}</h2>
          <div className="flex items-center mb-2">
            <UserCircleIcon className="w-6 h-6 text-secondary-600 mr-2" />
            <span className="text-gray-600">{fullName || user?.username || tCommon('user')}</span>
          </div>
          <div className="flex items-center">
            <EnvelopeIcon className="w-6 h-6 text-secondary-600 mr-2" />
            <span className="text-gray-600">{buyerEmail || tCommon('noEmail')}</span>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-gray-600 mb-4">{tCommon('propertyReference')}</h2>
          <div className="flex items-center mb-2">
            <HomeModernIcon className="w-6 h-6 text-secondary-600 mr-2" />
            <span className="text-gray-600">{propertyData?.title || tCommon('loading')}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-6 h-6 text-secondary-600 mr-2" />
            <span className="text-gray-600">
              {propertyData ? `${propertyData.location.town} / ${propertyData.location.province}` : tCommon('loading')}
            </span>
          </div>
        </div>
      </section>

      {/* Amount Section */}
      <section className="bg-white rounded-xl p-8 border border-black/10 space-y-4 mb-6">
        <h2 className="font-semibold text-gray-600 mb-4">{tCommon('paymentDetails')}</h2>
        <label className="block text-gray-600 font-medium mb-2">
          {tCommon('amountInEuro')} <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder={tCommon('bookingAmountInEuro')}
          className="block w-full border border-neutral-300 rounded-md px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <p className={`text-sm ${amountError ? "text-red-500" : "text-gray-500"}`}>
          {amountError || tCommon('pleaseEnterAmountAbove1000')}
        </p>
      </section>

      {/* Card Payment Section */}
      {amount && !amountError && (
        <section className="bg-white rounded-xl p-8 border border-black/10 space-y-4">
          <h2 className="font-semibold text-gray-600 mb-4">{tCommon('cardPayment')}</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={parseFloat(amount)}
              buyerEmail={buyerEmail}
              onPaymentSuccess={() => setShowSuccessModal(true)}
            />
          </Elements>
        </section>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <PaymentSuccessModal
          onClose={() => setShowSuccessModal(false)}
          propertyId={propertyData?.id}
        />
      )}
    </div>
  );
}

// Stripe Checkout Form Component
function CheckoutForm({
  amount,
  buyerEmail,
  onPaymentSuccess
}: {
  amount: number;
  buyerEmail: string;
  onPaymentSuccess: () => void;
}) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://inlandandalucia.onrender.com/api/v1";
  const tCommon = useTranslations('common');

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      console.log('Creating payment intent for amount:', amount);

      const res = await fetch(`${API_BASE_URL}/payments/create-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "eur",
          description: `Property viewing reservation`,
          metadata: {
            buyerEmail,
            propertyRef: sessionStorage.getItem('propertyData') ? JSON.parse(sessionStorage.getItem('propertyData')!).id : 'N/A'
          }
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || tCommon('failedToCreatePaymentIntent'));
      }

      const data = await res.json();
      console.log('Payment intent created:', data);

      if (!data.clientSecret) {
        setError(data.error || tCommon('paymentFailed'));
        setLoading(false);
        return;
      }

      const card = elements.getElement(CardElement);
      if (!card) {
        setError(tCommon('cardElementNotFound'));
        setLoading(false);
        return;
      }

      // ✅ Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          billing_details: { email: buyerEmail },
        },
      });

      if (result.error) {
        setError(result.error.message || tCommon('paymentFailed'));
      } else if (result.paymentIntent?.status === "succeeded") {
        console.log('✅ Stripe payment succeeded, calling backend success endpoint');

        // 🎯 Call your backend success endpoint
        try {
          const successResponse = await fetch(`${API_BASE_URL}/payments/success`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentIntentId: result.paymentIntent.id,
              propertyRef: sessionStorage.getItem('propertyData') ? JSON.parse(sessionStorage.getItem('propertyData')!).propertyRef : 'N/A',
              buyerEmail: buyerEmail
            }),
          });

          if (successResponse.ok) {
            const successData = await successResponse.json();
            console.log('✅ Backend success response:', successData);
            onPaymentSuccess();
          } else {
            const errorData = await successResponse.json();
            console.error('❌ Backend success failed:', errorData);
            setError(tCommon('paymentSucceededButFailed'));
          }
        } catch (backendError) {
          console.error('❌ Backend call failed:', backendError);
          setError(tCommon('paymentSucceededButFailed'));
        }
      }
    } catch (err) {
      console.error('❌ Payment error:', err);
      setError(tCommon('paymentErrorOccurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-3 border rounded-md mb-3" />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="px-5 py-2 bg-secondary-500 text-white rounded-md disabled:opacity-50"
      >
        {loading ? tCommon('processing') : tCommon('reserveNow')}
      </button>
    </form>
  );
}

// Payment Success Modal Component
function PaymentSuccessModal({
  onClose,
  propertyId
}: {
  onClose: () => void;
  propertyId?: string;
}) {
  const router = useRouter();
  const tCommon = useTranslations('common');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 3 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);

      // Redirect after fade animation completes
      setTimeout(() => {
        if (propertyId) {
          router.push(`/properties/${propertyId}`);
        } else {
          router.push('/properties');
        }
      }, 500); // Wait for fade animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [propertyId, router]);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
      <div className={`bg-white rounded-xl p-8 max-w-md mx-4 text-center transform transition-all duration-500 ${fadeOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}>
        <div className="mb-6">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">{tCommon('paymentSuccessful')}</h2>
          <p className="text-gray-600 mb-4">
            {tCommon('propertyReservedSuccessfully')}
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-700">
              {tCommon('confirmationEmailSent')}
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-3">
          <button
            onClick={() => {
              setFadeOut(true);
              setTimeout(() => {
                if (propertyId) {
                  router.push(`/properties/${propertyId}`);
                } else {
                  router.push('/properties');
                }
              }, 500);
            }}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {tCommon('goToPropertyDetails')}
          </button>
          {/* <button
            onClick={() => {
              setFadeOut(true);
              setTimeout(() => onClose(), 500);
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Stay Here
          </button> */}
        </div>
      </div>
    </div>
  );
}