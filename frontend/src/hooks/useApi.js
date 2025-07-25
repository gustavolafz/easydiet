import useSWR from 'swr';
import { getCookie } from 'cookies-next';

// Configuração global do fetcher
const fetcher = async (url, options = {}) => {
  const token = getCookie('access_token');
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

// Hook para buscar dados do usuário
export function useUserData(userId) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/user/${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minuto
    }
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook para buscar receitas do usuário
export function useUserRecipes(userId) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/user/recipe?user_id=${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 segundos
    }
  );

  return {
    recipes: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook para buscar dietas do usuário
export function useUserDiets(userId) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/user/diet?user_id=${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 segundos
    }
  );

  return {
    diets: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook para buscar alimentos
export function useFoodSearch(searchTerm) {
  const { data, error, isLoading } = useSWR(
    searchTerm ? `/api/food/search?nome=${encodeURIComponent(searchTerm)}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000, // 10 segundos
      keepPreviousData: true, // Mantém dados anteriores durante nova busca
    }
  );

  return {
    results: data ? (Array.isArray(data) ? data : [data]) : [],
    isLoading,
    isError: error,
  };
}

// Hook para buscar métricas do dashboard
export function useDashboardMetrics() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/metricas/hoje',
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 300000, // 5 minutos
    }
  );

  return {
    metrics: data || {
      caloriasConsumidas: 0,
      caloriasAlvo: 2000,
      proteinas: 0,
      carboidratos: 0,
      gorduras: 0,
      aguaConsumida: 0,
      aguaAlvo: 2.5,
      passosDados: 0,
      passosAlvo: 10000,
    },
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook para buscar refeições do dia
export function useDailyMeals(date) {
  const formattedDate = date ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` : null;
  
  const { data, error, isLoading, mutate } = useSWR(
    formattedDate ? `/api/refeicoes/${formattedDate}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 segundos
    }
  );

  return {
    meals: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Função para invalidar cache
export function invalidateCache(key) {
  mutate(key);
}

// Função para pré-carregar dados
export function preloadData(key) {
  mutate(key, fetcher(key));
} 