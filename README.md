# Mentor–Mentee Scheduling (React Native)
# Problem Statement

1. Implement a one-on-one mentor call scheduling flow for a mobile EdTech application using React Native, based on static UI designs and a provided data schema.

2. The goal is to model real-world scheduling constraints entirely on the frontend while keeping state predictable, logic consistent, and edge cases well handled.

# Functional Flow Implemented
    Step 1: Mentor list is available , clicking the mentor you will get the weekly availability display.
    
    Step 2: Slot Selection, select a slot (all slots are displayed based on the mentee timezone).
    
    Step 3: After slot selection, redirected to create booking page, select the final slot and date here and cnfirm booking.
    
    Step 4: Booking Confirmation, indicates booking is created successfully, with booking details.
    
    Step 5: Booking list, shows all the upcoming and previous bookings, click on any upcoming booking to reschedule it.
    
    Step 6: Rescheduling screen, select new slot and date to reschedule the session.
    
    Step 7: Empty State Handling, everywhere handled with proper UI given figma

# Data Model

    Users: Mentors and mentees with roles
    
    Weekly Availability: Recurring mentor slots
    
    Overrides: Date-specific unavailability
    
    Bookings: Confirmed and cancelled sessions
    
    Draft Booking: Temporary rescheduling state

This mirrors how a real backend would structure scheduling data.

# Trade-offs & Assumptions

    Availability is assumed static for the session
    
    Time precision handled at minute level
    
    Data integrity assumed from provided JSON

# How to Run
    npm install
    npx react-native run-android
    # or
    npx react-native run-ios.
