# GroupBuy App

## The Pain Point
I read that people who organise group buys may spend a lot of time on WhatsApp and Google Forms collecting orders. Besides that, they also have to handle enquiries, logistics, payment and marketing. This app seeks to simplify part of the workflow: taking orders, keeping track of the status every order made (like paid, collected, cancelled) and an interface to send messages to the buyers.

## The Idea for this App
GroupBuy will reduce the administrative time spent of managing orders and listings, providing the organiser an interface for:
    
- Customer facing listings: e-commerce app
- Administrative dashboard 

As group buying is done with your neighbours and people in your estate, the groupbuy organiser does not need a payment solution like Stripe or Paypal, which has a ~3% fee but works for international payments.

In Singapore, Paynow has no transaction fees and you can send payment to someone's registered phone number using any bank app. For GroupBuy app, Paynow is the primary mode of payment due to its ease of use and no cost. 

The main form of communication for the organiser is with WhatsApp. Using Twilio, the organiser can send preset or automated WhatsApp messages at a low price. The time saved should be worth the cost.

Given the focus on Paynow and WhatsApp, which are designed first for mobile, the app is built mobile first. Nevertheless it also works for desktop.

### Tech Stack
This is a PERN stack app hosted on Cyclic. 
The Postgres database is hosted on Bit.io

### Code Features
- Admin interface:
    - Requires admin role to access
    - Add or edit listings
    - Update order statuses: Paid, cancelled, refunded, collected
    - Automated or on click WhatsApp messages 
        - Automatic message sent to buyer on checkout
        - On click messages to send reminders for payment, collect and refund/cancellation
    - Upload images using Cloudinary's upload widget for their product listings
    - Every listing can have up to 5 images. Images can be updated

- Code splitting: Dynamic loading of all components that require authentication or admin rights

- Persistent login for all users using HTTP only cookie / JWT
    - Logging in sends a HTTP only cookie from server to the client that expires in 2 days
    - The cookie contains the jwt refresh token
    - The refresh token details specific to the user are also stored on the database
    - Logging in also sends the user details (excluding password) and jwt access token, which expires in 1 hour
    - When the user revisits pages that do not require authentication, the app will fire an api call to server
    - Pages that require authentication will redirect to login page
    - Server verifies the refresh token on the cookie and also checks database for the refresh token
    - If verified, user is logged in automatically and issued a new access token

- Responsive design for mobile/desktop

- State management
    - React Query handles and caches all server side state using unique tags
    - Ended using Zustand only for auth details like name, mobile and admin rights

- Users can update their account details, password. Forms are controlled inputs with validation

### Customer Journey

#### Returning Customer
Home Page >> Category >> Product >> Add to Cart >> Cart >> Checkout >> Confirm Checkout

#### New Customer
Home Page >> Category >> Product >> Add to Cart >> Log In >> Sign Up >> Log In >> (Same Journey As Returning Customer)

Improvements to shorten the journey can be 1 click purchase (reduce 4 steps) or a button on product page that directly goes to checkout (reduce 2 steps)

### Libraries

#### Client
- Client state management: Zustand
- Server state management: React Query, Axios
- Styling: Tailwind, DaisyUI, Swiper, React Toastify, React Loader Spinner
- Forms/Validation: React Hook Forms
- Image uploading/hosting: Cloudinary
- Testing: Vitest

#### Server
- Authentication: Jsonwebtoken, Cookie parser
- ORM for SQL: Sequelize
- Validation: Validator
- WhatsApp communication: Twilio

#### Database

![](https://res.cloudinary.com/dkilrhnk7/image/upload/v1671102525/drawSQL-export-2022-12-15_19_08_vdqkhb.png)

#### References

[Channel News Asia article](https://www.channelnewsasia.com/cnainsider/free-delivery-bulk-discounts-singapore-rise-community-group-buys-2051651)

Images from [Amazon.sg](https://www.amazon.sg/)

Persistent login by [Dave Gray](https://youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd)

