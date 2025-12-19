import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  username: string;
  balance: number;
  referralCount: number;
  referralCode: string;
}

type Screen = 'instructions' | 'signals' | 'referral' | 'vip' | 'crashx';

interface UserScreensProps {
  user: User | null;
  balance: number;
  referralCount: number;
  currentSignal: number | null;
  timeLeft: number;
  isWaiting: boolean;
  crashXSignal: number | null;
  crashXTimeLeft: number;
  isCrashXWaiting: boolean;
  screen: Screen;
  setScreen: (screen: any) => void;
  generateSignal: () => void;
  copyReferralLink: () => void;
  generateCrashXSignal: () => void;
}

export const UserScreens = ({
  user,
  balance,
  referralCount,
  currentSignal,
  timeLeft,
  isWaiting,
  crashXSignal,
  crashXTimeLeft,
  isCrashXWaiting,
  screen,
  setScreen,
  generateSignal,
  copyReferralLink,
  generateCrashXSignal,
}: UserScreensProps) => {
  if (screen === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => setScreen('home')}
            className="mb-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            <Icon name="arrow-left" className="mr-2" />
            Назад
          </Button>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Как использовать сигналы 1WIN
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Icon name="zap" className="mr-2 text-yellow-400" />
                  Что такое сигналы?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Сигналы - это рекомендации по коэффициентам, которые с высокой вероятностью сработают в игре Aviator на платформе 1WIN.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Icon name="target" className="mr-2 text-green-400" />
                  Как использовать?
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Зарегистрируйтесь на 1WIN по кнопке "Регистрация"</li>
                  <li>Откройте игру Aviator в разделе "Быстрые игры"</li>
                  <li>Получите сигнал в нашем боте</li>
                  <li>Дождитесь раунда и сделайте ставку</li>
                  <li>Выведите средства на указанном коэффициенте</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Icon name="trending-up" className="mr-2 text-blue-400" />
                  Советы для успеха
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Начинайте с небольших ставок</li>
                  <li>Используйте несколько сигналов подряд</li>
                  <li>Не гонитесь за большими коэффициентами</li>
                  <li>Выводите выигрыш вовремя</li>
                  <li>Следите за балансом</li>
                </ul>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-200 text-sm">
                  ⚠️ Помните: азартные игры могут вызывать зависимость. Играйте ответственно и только на те средства, которые можете позволить себе потратить.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (screen === 'signals') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => setScreen('home')}
            className="mb-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            <Icon name="arrow-left" className="mr-2" />
            Назад
          </Button>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Aviator Сигналы</h2>
              <p className="text-gray-300">Получите прогноз следующего коэффициента</p>
            </div>

            {currentSignal && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 mb-6 text-center shadow-2xl">
                <p className="text-white/80 text-sm mb-2">Рекомендуемый коэффициент:</p>
                <p className="text-6xl font-bold text-white">{currentSignal}x</p>
              </div>
            )}

            <Button
              onClick={generateSignal}
              disabled={isWaiting}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-6 text-lg disabled:opacity-50"
            >
              {isWaiting ? (
                <>
                  <Icon name="clock" className="mr-2 animate-spin" />
                  Следующий сигнал через {timeLeft}с
                </>
              ) : (
                <>
                  <Icon name="zap" className="mr-2" />
                  Получить сигнал
                </>
              )}
            </Button>

            <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-200">
                💡 Совет: Дождитесь нового раунда в игре Aviator и поставьте на рекомендуемый коэффициент
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (screen === 'referral') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => setScreen('home')}
            className="mb-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            <Icon name="arrow-left" className="mr-2" />
            Назад
          </Button>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Реферальная программа
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-6">
                <div className="text-center mb-4">
                  <Icon name="users" className="w-16 h-16 mx-auto mb-2 text-yellow-400" />
                  <p className="text-3xl font-bold">{referralCount}</p>
                  <p className="text-gray-300">Приглашенных друзей</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Ваша реферальная ссылка:</h3>
                <div className="flex gap-2">
                  <Input
                    value={`https://t.me/Lusky_bear_bot?start=${user?.referralCode}`}
                    readOnly
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <Button
                    onClick={copyReferralLink}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Icon name="copy" />
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Как это работает?</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <Icon name="check-circle" className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                    <span>Поделитесь ссылкой с друзьями</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check-circle" className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                    <span>За каждого друга получите +5₽ на баланс</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check-circle" className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                    <span>Средства можно использовать для покупки VIP</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-200 text-sm text-center">
                  💰 Текущий баланс: <span className="font-bold">{balance} ₽</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (screen === 'vip') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => setScreen('home')}
            className="mb-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            <Icon name="arrow-left" className="mr-2" />
            Назад
          </Button>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="text-center mb-6">
              <Icon name="crown" className="w-20 h-20 mx-auto mb-4 text-yellow-400" />
              <h2 className="text-3xl font-bold mb-2">VIP Сигналы</h2>
              <p className="text-gray-300">Премиум доступ к точным прогнозам</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Преимущества VIP
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Icon name="check-circle" className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                    <span>Более точные сигналы с вероятностью 85%+</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check-circle" className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                    <span>Приоритетная поддержка 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check-circle" className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                    <span>Эксклюзивные стратегии и советы</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check-circle" className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                    <span>Доступ к закрытому VIP каналу</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-6 text-center">
                <p className="text-2xl font-bold mb-2">299 ₽</p>
                <p className="text-gray-300 mb-4">на 30 дней</p>
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4">
                  <Icon name="crown" className="mr-2" />
                  Купить VIP доступ
                </Button>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-200 text-sm text-center">
                  💡 Используйте баланс для оплаты. Текущий баланс: <span className="font-bold">{balance} ₽</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (screen === 'crashx') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => setScreen('home')}
            className="mb-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            <Icon name="arrow-left" className="mr-2" />
            Назад
          </Button>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">CrashX Сигналы</h2>
              <p className="text-gray-300">Получите прогноз для игры CrashX</p>
            </div>

            {crashXSignal && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 mb-6 text-center shadow-2xl">
                <p className="text-white/80 text-sm mb-2">Рекомендуемый коэффициент:</p>
                <p className="text-6xl font-bold text-white">{crashXSignal}x</p>
              </div>
            )}

            <Button
              onClick={generateCrashXSignal}
              disabled={isCrashXWaiting}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 text-lg disabled:opacity-50"
            >
              {isCrashXWaiting ? (
                <>
                  <Icon name="clock" className="mr-2 animate-spin" />
                  Следующий сигнал через {crashXTimeLeft}с
                </>
              ) : (
                <>
                  <Icon name="zap" className="mr-2" />
                  Получить сигнал CrashX
                </>
              )}
            </Button>

            <div className="mt-6 p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
              <p className="text-sm text-orange-200">
                💡 Совет: Дождитесь нового раунда в игре CrashX и поставьте на рекомендуемый коэффициент
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};
