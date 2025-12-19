import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface AuthScreenProps {
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleAuth: () => void;
  handleRegister: () => void;
}

export const AuthScreen = ({
  authMode,
  setAuthMode,
  username,
  setUsername,
  password,
  setPassword,
  handleAuth,
  handleRegister
}: AuthScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#0f1419] to-[#1a0f2e]" />
      
      <Card className="relative z-10 w-full max-w-md bg-black/60 border border-[#9b87f5]/30 p-6 sm:p-8 animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-black mb-2" style={{ color: '#9b87f5' }}>
            🐻 Lusky Bear
          </h1>
          <p className="text-sm sm:text-base" style={{ color: '#00F0FF' }}>
            {authMode === 'login' ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: '#9b87f5' }}>
              Имя пользователя
            </label>
            <Input
              placeholder="Введите имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black/40 border-[#9b87f5]/30 focus:border-[#9b87f5]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: '#9b87f5' }}>
              Пароль
            </label>
            <Input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              className="bg-black/40 border-[#9b87f5]/30 focus:border-[#9b87f5]"
            />
          </div>

          <Button
            onClick={handleAuth}
            className="w-full h-12 text-base sm:text-lg font-bold bg-[#1a1a2e] hover:bg-[#252545] text-[#9b87f5] border-2 border-[#9b87f5]/30 hover:border-[#9b87f5]/60"
          >
            {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>

          <div className="text-center">
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-sm hover:underline"
              style={{ color: '#00F0FF' }}
            >
              {authMode === 'login' ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
            </button>
          </div>

          <Button
            onClick={handleRegister}
            className="w-full h-12 text-base sm:text-lg font-bold bg-[#1a1a2e] hover:bg-[#252545] text-[#FF10F0] border-2 border-[#FF10F0]/30 hover:border-[#FF10F0]/60"
          >
            <Icon name="UserPlus" size={20} className="mr-2" />
            Зарегистрироваться в боте
          </Button>
        </div>
      </Card>
    </div>
  );
};
