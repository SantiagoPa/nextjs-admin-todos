'use server';
import { cookies } from "next/headers";

export const getCookieCart = async (): Promise<{ [id: string]: number }> => {
    const cookieStore = await cookies();
    if ( cookieStore.has('cart') ) {
        const cookieCart = cookieStore.get('cart');
        if (cookieCart) {
            return JSON.parse(cookieCart.value);            
        }
    }
    return {};
}

export const addProductToCart = async (id: string) => {
    const cookieStore = await cookies();
    const cookieCart = await getCookieCart();

    if ( cookieCart[id] ) {
        cookieCart[id] = cookieCart[id] + 1; 
    } else {
        cookieCart[id] = 1; 
    }

    cookieStore.set("cart", JSON.stringify( cookieCart ));
}

export const removeProductFromCart = async (id: string) => {
    const cookieStore = await cookies();
    const cookieCart = await getCookieCart();
    
    delete cookieCart[id];

    cookieStore.set("cart", JSON.stringify( cookieCart ) );
}

export const removeSingleItemFromCart = async (id: string) => {
    const cookieStore = await cookies();
    const cookieCart = await getCookieCart();
    if ( !cookieCart[id] ) return;

    const itemsInCart = cookieCart[id] - 1;
    if ( itemsInCart <= 0 ) {
        delete cookieCart[id]; 
    } else {
        cookieCart[id] = itemsInCart; 
    }
    cookieStore.set("cart", JSON.stringify( cookieCart ));
}