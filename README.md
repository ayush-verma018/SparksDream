# Mentor–Mentee Scheduling (React Native)

# APK Download link:
https://expo.dev/accounts/ayush_verma018/projects/SparksDream/builds/20a2e7b1-3fa5-46e0-a30d-05279a8f6379
# Problem Statement

1. Implement a one-on-one mentor call scheduling flow for a mobile EdTech application using React Native, based on static UI designs and a provided data schema.

2. The goal is to model real-world scheduling constraints entirely on the frontend while keeping state predictable, logic consistent, and edge cases well handled.

# Functional Flow Implemented
1. Mentor Selection: Users can view the list of mentors and access each mentor’s weekly availability.
2. Slot Selection: Available slots are displayed based on the mentee’s timezone, allowing users to choose a preferred slot.
3. Booking Creation: After selecting a slot, users are redirected to the booking screen to confirm the final date and time.
4. Booking Confirmation: A confirmation screen displays the successful booking along with session details.
5. Booking List: Users can view all upcoming and past bookings, with the option to reschedule upcoming sessions.
6. Rescheduling: Users can select a new date and time to reschedule an existing booking.
7. Empty States: All empty and edge states are handled gracefully with UI aligned to the provided Figma designs

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
