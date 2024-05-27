import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
    const saltRounds = 7;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function sendLoginRequest(email, password) {
    try {
        const hashedPassword = await hashPassword(password);
        const requestData = { email, password: hashedPassword };

        const response = await fetch('http://www.langazobs.langazel.asso.fr/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Erreur lors de la requête:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}
