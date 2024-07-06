import { atom } from 'recoil';

export const cartDataState = atom({
    key: 'cartDataState', // 상태의 고유 식별자(key)
    default: [], // 초기값을 빈 배열로 변경
});
