# GroupBuy App
This is my capstone project for General Assembly's Software Engineering Immersive Course.

[Slides presentation](https://docs.google.com/presentation/d/1j00h6ZbbwH806DxkxzwZWWWAsxfzUrwYsTR1p90pzDM/edit?usp=sharing)

## The Pain Point
I read that people who organise group buys may spend a lot of time on WhatsApp and Google Forms collecting orders. Besides that, they also have to handle enquiries, logistics, payment and marketing. This app seeks to simplify part of the workflow: taking orders, keeping track of the status every order made (like paid, collected, cancelled) and an interface to send messages to the buyers.

## The Idea for this App
GroupBuy will reduce the administrative time spent of managing orders and listings, providing the organiser an interface for:
    
- Customer facing listings: e-commerce app
- Administrative dashboard 

As group buying is done with your neighbours and people in your estate, the groupbuy organiser does not need a payment solution like Stripe or Paypal, which has a ~3% fee but works for international payments.

In Singapore, Paynow has no transaction fees and you can send payment to someone's registered phone number using any bank app. For GroupBuy app, Paynow is the primary mode of payment due to its ease of use and no cost. 

The main form of communication for the organiser currently is WhatsApp. Communication can be one-to-one or broadcasted to all buyers. Using Twilio, the organiser can send preset or automated WhatsApp messages at a low price. The time saved should be worth the cost.

Paynow and WhatsApp are integral to the group buyer. Both these apps are designed first for mobile, so the app is built mobile first. Nevertheless it also works for desktop.

### Tech Stack
This is a PERN stack app hosted on Cyclic. 
The Postgres database is hosted on Bit.io

### Libraries

#### Client
- Client state management: Zustand
- Server state management: React Query, Axios
- Styling: Tailwind, DaisyUI, Swiper, React Toastify, React Loader Spinner
- Forms/Validation: React Hook Forms
- Image uploading/hosting: Cloudinary
- Testing: Vitest, React Testing Library, Mock Service Worker

#### Server
- Authentication: Jsonwebtoken, Cookie parser
- ORM for SQL: Sequelize
- Validation: Validator
- Encryption of password/OTP: Bcrypt
- Dates: DayJS
- WhatsApp communication: Twilio

### Code Features
- Automated testing with Vitest, React Testing Library and Mock Service Worker
    - 80% test coverage
    - React Testing Library (RTL) used to test React components and check the DOM
    - Mock Service Worker (MSW) used to mock async API call
    - React components are passed through a function which wraps React Query's `QueryClientProvider` and React Router DOM's `BrowserRouter` or `MemoryRouter` in order to render the component
    - Tested successful and unsuccessful API calls
    - Custom hooks: successful and unsuccessful test case
![](https://res.cloudinary.com/dkilrhnk7/image/upload/v1675325080/groupbuy-testing_twogfn.png)

- Automated or one click WhatsApp messages using Twilio API
    - Client makes API call to server, which makes API call to Twilio to send message
    - Automated message sent to buyer on checkout
    - One click button to send reminders for payment, collect and refund/cancellation
    - One Time Password sent via WhatsApp with a 5 minute expiration if user forgets password

- Code splitting: Dynamic loading of all components that require authentication or admin rights

- CRUD
    - Admin interface:
        - Requires admin role to access
        - Add or edit listings
        - Update order statuses: Paid, cancelled, refunded, collected
        - Upload images using Cloudinary's upload widget for their product listings
        - Every listing can have up to 5 images. Images can be updated or deleted
    - Users can update their account details, password. Forms are controlled inputs with validation

- Custom middleware on server
    - To protect routes that require authentication or admin rights
    - `verifyJWT` checks that the access token sent from client is valid
    - `verifyAdmin` checks that the admin rights stored on access token are valid

- Persistent login for all users using HTTP only cookie / JWT
    - Logging in sends jwt access token to client, which expires in 1 hour
    - Access token is needed for API calls which require auth
    - Access token stores admin rights of user, which grants access to admin only API calls
    - Logging in also sends a HTTP only cookie from server to the client that expires in 2 days
    - The cookie contains the jwt refresh token
    - Refresh token is also stored on the database 
    - App will refresh access token upon visit or when the browser tab becomes active by checking refresh token
    - Pages that require authentication will redirect to login page if refresh fails
    - Database can store up to 3 refresh tokens to allow multiple device login

- Responsive design for mobile/desktop

- State management
    - React Query handles and caches all server state
    - Zustand used for auth details like name, mobile and admin rights

### Customer Journey

#### Returning Customer
6 STEPS: Home Page >> Category >> Product >> Add to Cart >> Cart >> Checkout >> Confirm Checkout 

#### New Customer
12 STEPS: Home Page >> Category >> Product >> Add to Cart >> Log In >> Sign Up >> Log In >> (Same Journey As Returning Customer)

Improvements to shorten the journey can be 1 click purchase (reduce by 4 steps) or a checkout button on product page (reduce by 2 steps)

### Database

![](https://res.cloudinary.com/dkilrhnk7/image/upload/v1674481788/drawSQL-export-2022-12-23_21_38_uhndly.png)

### Further Improvements
- Improvements to e-commerce app:
    - Recommendations
    - Top sellers

#### References

[News article on group buying](https://www.channelnewsasia.com/cnainsider/free-delivery-bulk-discounts-singapore-rise-community-group-buys-2051651)

Images from [Amazon.sg](https://www.amazon.sg/)

Persistent login by [Dave Gray](https://youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd)

[Stop mocking fetch by Kent C. Dodds](https://kentcdodds.com/blog/stop-mocking-fetch)

[Custom useVisibleTab hook to check if browser tab is focused](https://stackoverflow.com/questions/49902883/check-if-the-browser-tab-is-in-focus-in-reactjs)