import React from 'react';
import { authService } from '../../src/services/auth/authService';
import { useUserService } from '../../src/services/hooks/useUserService';

export default function ProfilePage() {
  const dados = useUserService.getProfilePage();

  return (
    <div>
      Página de Profile!
      <img src="https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif" alt="Nicolas Cage" />
      {/* <pre>
        {JSON.stringify(props, null, 2)}
      </pre> */}

      {dados.loading && 'loading'}
      {!dados.loading && dados.data && 'Carregou com sucesso'}
      {!dados.loading && dados.error}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSection = await auth.hasActiveSection();

  if (hasActiveSection) {
    const session = await auth.getSession();
    // const profilePage = await userService.getProfilePage(ctx);
    return {
      props: {
        user: {
          ...session,
          // ...profilePage.user,
        },
        // posts: profilePage.posts,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login' });
  ctx.res.end();
  return { props: {} };
}
