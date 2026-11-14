import React, { useState, useEffect } from 'react';
import MurmurLogo from '../components/MurmurLogo';
import Link from 'next/link';
import { SearchIcon, UsersIcon, ChatIcon } from '@heroicons/react/outline';
import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { colorThemeState } from '../atoms/atom';
import AnimatedButton from '../components/AnimatedButton';
import Spinner from '../components/Spinner';
import { IProvider } from '../utils/types';

const Auth = () => {
  const router = useRouter();
  const signUp = router.query['sign-up'] === 'true';
  const theme = useRecoilValue(colorThemeState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [providers, setProviders] = useState({});
  const [providersLoading, setProvidersLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers || {});
      setProvidersLoading(false);
    };
    fetchProviders();
  }, []);


  const handleAuth = async (provider: IProvider) => {
    setLoading(true);
    setError('');

    try {
      const result = await signIn(provider.id, {
        redirect: false,
        callbackUrl: "/"
      });

      if (result?.error) {
        setError(`Authentication failed: ${result.error}`);
      } else if (result?.url) {
        // Successful authentication, redirect manually
        window.location.href = result.url;
      }
    } catch (error) {
      setError('An error occurred during authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (signUp) {
        // Handle registration
        if (!name || !email || !password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }

        if (password.length < 8) {
          setError('Password must be at least 8 characters long');
          setLoading(false);
          return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        if (!passwordRegex.test(password)) {
          setError('Password must contain at least one lowercase letter, one uppercase letter, and one number');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        });

        const data = await response.json();

        if (response.ok) {
          // Registration successful, now sign in
          const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl: '/',
          });

          if (result?.error) {
            setError('Registration successful, but login failed. Please try logging in.');
          } else if (result?.url) {
            // Successful login after registration, redirect manually
            window.location.href = result.url;
          }
        } else {
          setError(data.message || 'Registration failed');
        }
      } else {
        // Handle login
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: '/',
        });

        if (result?.error) {
          setError('Invalid email or password');
        } else if (result?.url) {
          // Successful login, redirect manually
          window.location.href = result.url;
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${theme}`}>
      <div className="text-black dark:text-white flex min-h-screen w-screen max-w-full">
        <Head>
          <title>Login to Murmur</title>
          <link rel="icon" href="/assets/murmur-logo.svg" />
        </Head>

        {/* Navigation header */}
        <nav aria-label="Guest" className="absolute top-4 right-4 z-10">
          <Link href="/">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-lightblue-500 dark:hover:text-lightblue-400 transition-colors duration-200">
              Continue as Guest
            </button>
          </Link>
        </nav>
        <aside aria-label="About Murmur" className="hidden text-white md:flex flex-col flex-1 bg-lightblue-500 justify-center items-center p-12 lg:p-24">
          <div className="space-y-5">
            <div className="flex space-x-3">
              <SearchIcon className="h-5 w-5" />
              <p>Find people worth following.</p>
            </div>

            <div className="flex space-x-3">
              <UsersIcon className="h-5 w-5" />
              <p>Keep up with the news in one feed.</p>
            </div>

            <div className="flex space-x-3">
              <ChatIcon className="h-5 w-5" />
              <p>Post, reply, and share what you think.</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex justify-center items-center p-4 sm:p-12 lg:p-24 bg-white dark:bg-black">
          <div>
            <MurmurLogo className="h-[30px] w-[30px] text-lightblue-500" />
            <h1 className="text-2xl font-bold">Short posts. Real conversations.</h1>
            <p className="font-bold">Join Murmur today</p>

            {/* Credential-based authentication form */}
            <form onSubmit={handleCredentialAuth} className="space-y-4 my-6">
              {error && (
                <div role="alert" className="text-red-700 text-sm bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              {signUp && (
                <input
                  type="text"
                  aria-label="Full Name"
                  autoComplete="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightblue-500 placeholder-gray-500"
                  required
                />
              )}

              <input
                type="email"
                aria-label="Email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightblue-500 placeholder-gray-500"
                required
              />

              <input
                type="password"
                aria-label="Password"
                autoComplete={signUp ? 'new-password' : 'current-password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightblue-500 placeholder-gray-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-lightblue-500 text-white p-3 rounded-lg hover:bg-lightblue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : (signUp ? 'Sign up' : 'Sign in')}
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {providersLoading ? (
              <div className="py-3 flex justify-center">
                <Spinner />
              </div>
            ) : (
              Object.values(providers)
                .filter((provider: IProvider) => provider.id !== 'credentials')
                .map((provider: IProvider) => {
                  return (
                    // Show the animated button with the provider (Google, etc.)
                    <div key={provider.name} className="py-3">
                      <AnimatedButton handleAuth={handleAuth} provider={provider} authName={provider.name} signUp={signUp} disabled={loading} />
                    </div>
                  );
                })
            )}

            {!signUp && <div>Don't have an account? <Link href="/auth?sign-up=true"><a className="text-lightblue-500 dark:text-lightblue-400 cursor-pointer underline" onClick={() => setError('')}>Sign Up</a></Link></div>}
            {signUp && <div>Already have an account? <Link href="/auth"><a className="text-lightblue-500 dark:text-lightblue-400 cursor-pointer underline" onClick={() => setError('')}>Sign In</a></Link></div>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Auth;
