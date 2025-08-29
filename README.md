# 🏨 SwiftStay Nigeria – Frontend

SwiftStay is a hotel reservation and inventory management platform built to connect travelers with reliable stays across Nigeria – from busy cities to quiet towns.  

This repository contains the **frontend application** built with **Next.js 14, React 18, TypeScript, TailwindCSS, and Framer Motion**.

---

## 🚀 Features
- 🔐 **Authentication** (Register / Login)
- 🏠 **Hotel Listings** with filters & search
- 📅 **Booking System** integrated with backend APIs
- 💳 **Payment Integration** (Paystack / Flutterwave ready)
- 🎨 **Modern UI** with TailwindCSS + Framer Motion animations
- 🤖 **AI Assistant Component** (for customer support)

---

## 📂 Project Structure
swiftstay-backend/
 ├── prisma/
  │    └── schema.prisma
   ├── src/
    │    ├── index.ts         # App entry
     │    ├── routes/
      │    │     ├── auth.ts
       │    │     ├── hotels.ts
        │    │     ├── reservations.ts
         │    │     └── payments.ts
          │    └── utils/
           │          └── auth.ts
            ├── package.json
             ├── tsconfig.json
              └── .env
