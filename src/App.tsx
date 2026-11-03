import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Link } from 'wouter';  // ← Ajout de Link ici
import { HomePage, EquipementsPage, AboutPage, ContactPage } from './pages/showcase';
import { RegistrationProcessPage } from './pages/registration-process';
import { Shell } from '@/components/site';
import { ErrorBoundary } from '@/components/error-boundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/processus-enregistrement" component={RegistrationProcessPage} />
          <Route path="/equipements" component={EquipementsPage} />
          <Route path="/a-propos" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route>
            <Shell>
              <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-primary">404</h1>
                  <p className="mt-4 text-xl text-muted-foreground">Page non trouvée</p>
                  <Link href="/" className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-white">
                    Retour à l'accueil
                  </Link>
                </div>
              </div>
            </Shell>
          </Route>
        </Switch>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;