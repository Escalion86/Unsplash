import Unsplash from 'unsplash-js';
import React from 'react';

const AuthPage = () => {
    const unsplash = new Unsplash({ 
        accessKey: "SB6Seq-YN5XjInu5sr9PEpxQbE5OmUYkpzigjwcg50k",
        secret: "b9tVIsp0cErEqtwEavBWGn61cX2_8F5NypHlaQRzFl0",
        callbackUrl: "http://picso.escalion.ru"
    });

    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
        "public",
        "write_likes"
    ]);

    const code = window.location.search.split('code=')[1];
    // Если код передан, отправляем запрос на получение токена
    if (!code)
        window.location.assign(authenticationUrl);
    else { 
        unsplash.auth.userAuthentication(code)
        .then(res => res.json())
        .then(json =>
            {
                localStorage.setItem("unsplash-authAC-code", json.access_token);
                unsplash.auth.setBearerToken(json.access_token);
                // Теперь можно сделать что-то от имени пользователя
                // Например, поставить лайк фотографии
                // unsplash.photos.likePhoto("kBJEJqWNtNY");
            })
    };

    return (
        <section className="general">
            <h3>Autorization Success</h3>
        </section>
    );
}

export default AuthPage;