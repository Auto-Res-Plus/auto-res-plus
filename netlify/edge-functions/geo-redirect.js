export default async function handler(request, context) {
    const country = context.geo?.country?.code;
    const host = new URL(request.url).hostname;

    const isDotCom  = host === 'auto-reservation-plus.com'  || host === 'www.auto-reservation-plus.com';
    const isDotCoUK = host === 'auto-reservation-plus.co.uk' || host === 'www.auto-reservation-plus.co.uk';

    const path = new URL(request.url).pathname + new URL(request.url).search;

    // UK visitor on .com → redirect to .co.uk
    if (country === 'GB' && isDotCom) {
        return Response.redirect('https://auto-reservation-plus.co.uk' + path, 302);
    }

    // Non-UK visitor on .co.uk → redirect to .com
    if (country !== 'GB' && isDotCoUK) {
        return Response.redirect('https://auto-reservation-plus.com' + path, 302);
    }

    return context.next();
}
