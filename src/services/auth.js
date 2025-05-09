import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useAuth() {
  const router = useRouter();
  const error = ref(null);

  const login = async (email, password) => {
    try {
      // Call your API (e.g., axios.post('/login', { email, password }))
      await axios.post('/login', { email, password });
      router.push('/dashboard');
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  return { login, error };
}