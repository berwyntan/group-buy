# GroupBuy App

## The Pain Point

I read that people who organise group buys may spend a lot of time on WhatsApp and Google Forms collecting orders. Besides that, they also have to handle enquiries, logistics, payment and marketing. This app seeks to simplify part of the workflow: taking orders, keeping track of the status every order made (like paid, collected, cancelled) and an interface to send messages to the buyers.

## The Idea for this App

GroupBuy will reduce the administrative time spent of managing orders and listings, providing the organiser an interface for:
    - Customer facing listings - e-commerce app
    - Administrative dashboard 

As group buying is done with your neighbours and people in your estate, the groupbuy organiser does not need a payment solution like Stripe or Paypal, which has a ~3% fee but works for international payments.

In Singapore, Paynow has no transaction fees and you can send payment to someone's registered phone number using any bank app. For GroupBuy app, Paynow is the primary mode of payment due to its ease of use and no cost. 

The main form of communication for the organiser is with WhatsApp. Using Twilio, the organiser can send preset or automated WhatsApp messages at a low price. The time saved should be worth the cost.

Given the focus on Paynow and WhatsApp, which are designed first for mobile, the app is built mobile first. Nevertheless it also works for desktop.


### Tech Stack

This is a PERN stack app hosted on Cyclic. 
The Postgres database is hosted on Bit.io

### App Features

- Admin interface:
    - Add or edit listings
    - Update order statuses: Paid, cancelled, refunded, collected

- Automated or on click WhatsApp messages for admin
    - Automatic message on checkout
    - On click messages to send reminders for payment, collect and refund/cancellation

- Admin can upload images using Cloudinary's upload widget for their product listings

- Persistent login for all users using HTTP only cookie / JWT

- Responsive design for mobile/desktop

- All users can update their account details, password

### Libraries

#### Client

Client state management: Zustand
Server state management: React Query, Axios
Styling: Tailwind, DaisyUI, Swiper, React Toastify, React Loader Spinner
Forms/Validation: React Hook Forms
Image uploading/hosting: Cloudinary
Testing: Vitest

#### Server

Authentication: Jsonwebtoken, Cookie parser
ORM for SQL: Sequelize
Validation: Validator
WhatsApp communication: Twilio

#### References

