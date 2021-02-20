import moment from 'moment';

export const generateBackground = () => {
    const arr = [
        'background--spring',
        'background--summer',
        'background--fall',
        'background--winter',
    ];
    const now = moment().hour();
    let background: string;
    if (now >= 0 && now < 6) {
        background = arr[0];
    } else if (now < 12) {
        background = arr[1];
    } else if (now < 18) {
        background = arr[2];
    } else {
        background = arr[3];
    }
    return background;
};

export const randomText = (): string => {
    const MORNING_WISHES = [
        'Good morning, wish you a day full of happiness and joy',
        'Good morning have a great day',
        "Good morning, don't forget to eat a healthy breakfast",
        'Good morning have a nice day',
        'Good morning, wake up and be awesome',
    ];
    const AFTERNOON_WISHES = [
        'Your dream doesn’t have an expiration date. take a deep breath, and try again. Good afternoon.',
        'The biggest motivation is your own thoughts, so think big and motivate yourself to win. Good afternoon!',
        'Thinking of you is my most favorite hobby every afternoon. Your love is all I desire in life. Wishing my beloved an amazing afternoon!',
        "Don't forget to eat lunch, sir",
        'Hope your day is going well, sending smiles your way!',
    ];
    const EVENING_WISHES = [
        'Good evening, i wish this beautiful evening make you feel the beauty of the day',
        'Enjoy every moment, good or bad. Because the gift of life is life itself. Have a great evening',
        'Like evening stars are the most shining ones, the evening time is the calmest time of the day, good evening sir',
        'Ending your day while having a cup of coffee with your best friend is indeed the best ending your day could have, good evening',
        'May your destiny always keep shining like that and your hard work never let destiny outclass your efforts, good evening',
    ];
    const now = Number(new Date().getHours());
    let wishesCollect: string[] = MORNING_WISHES;
    if (now > 5 && now <= 11) {
        wishesCollect = MORNING_WISHES;
    } else if (now > 11 && now <= 17) {
        wishesCollect = AFTERNOON_WISHES;
    } else if ((now > 17 && now <= 24) || now <= 5) {
        wishesCollect = EVENING_WISHES;
    }
    return wishesCollect[Math.floor(Math.random() * 5)];
};

export const getWeekdays = () => {
    return moment.weekdays();
};

export const getWeekdaysShort = () => {
    return moment.weekdaysShort();
};

export const getMonths = () => {
    return moment.monthsShort();
};
