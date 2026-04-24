import { supabase } from './supabase';

const DEVICE_ID_KEY = 'cha-bar-device-id';

const getDeviceId = () => {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
        id = typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `dev-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
};

export const registerPageView = async () => {
    const deviceId = getDeviceId();
    const today = new Date().toISOString().slice(0, 10);

    const { error } = await supabase
        .from('page_views')
        .insert({ device_id: deviceId, view_date: today });

    if (error && error.code !== '23505') {
        console.error('Erro ao registrar page view:', error);
    }
};

export const trackGiftClick = async (giftId, giftName) => {
    const { error } = await supabase
        .from('gift_clicks')
        .insert({ gift_id: giftId, gift_name: giftName });

    if (error) {
        console.error('Erro ao registrar clique de presente:', error);
    }
};
