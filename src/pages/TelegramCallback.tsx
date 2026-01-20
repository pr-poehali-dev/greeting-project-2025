import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegramAuth } from '@/components/extensions/telegram-bot/useTelegramAuth';
import { toast } from 'sonner';

const TELEGRAM_AUTH_URL = 'https://functions.poehali.dev/37376f8d-96d9-4835-abdc-841278f787be';

const TelegramCallback = () => {
  const navigate = useNavigate();
  const telegramAuth = useTelegramAuth({
    apiUrls: {
      callback: `${TELEGRAM_AUTH_URL}?action=callback`,
      refresh: `${TELEGRAM_AUTH_URL}?action=refresh`,
      logout: `${TELEGRAM_AUTH_URL}?action=logout`,
    },
    botUsername: 'Lusky_bear_bot',
  });

  useEffect(() => {
    const handleAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        toast.error('Токен не найден');
        navigate('/');
        return;
      }

      const success = await telegramAuth.handleCallback(token);
      
      if (success) {
        toast.success('Вход выполнен через Telegram!');
        navigate('/');
      } else {
        toast.error('Ошибка авторизации');
        navigate('/');
      }
    };

    handleAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0118] via-[#1a0f2e] to-[#0f0520]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00F0FF] mb-4"></div>
        <p className="text-white text-lg">Авторизация через Telegram...</p>
      </div>
    </div>
  );
};

export default TelegramCallback;
