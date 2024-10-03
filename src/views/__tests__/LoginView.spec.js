// tests/LoginView.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import LoginView from '../LoginView.vue'
import axiosInstance from '../../axios'
import { useRouter } from 'vue-router'

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useRouter: vi.fn()
  }
})

vi.mock('../../axios', () => ({
  default: {
    post: vi.fn()
  }
}))

describe('LoginView.vue', () => {
  let alertMock

  beforeEach(() => {
    alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  afterEach(() => {
    alertMock.mockRestore()
  })

  it('renders the login form', () => {
    const wrapper = mount(LoginView)
    console.log(wrapper.html())
    expect(wrapper.text()).toContain('Login')

    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="btn-submit"]').exists()).toBe(true)
  })

  it('displays an error message on login failure', async () => {
    const wrapper = mount(LoginView)
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')
    const loginButton = wrapper.find('[data-testid="btn-submit"]')

    emailInput.setValue('test@example.com')
    passwordInput.setValue('wrongpassword')

    axiosInstance.post.mockRejectedValueOnce(new Error('Login failed'))

    await loginButton.trigger('submit.prevent')

    expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@example.com',
      password: 'wrongpassword'
    })
    expect(window.alert).toHaveBeenCalledWith('Login failed. Please check your email and password.')
  })

  it('redirects to home on successful login', async () => {
    const routerPush = vi.fn()
    useRouter.mockReturnValue({ push: routerPush })

    const wrapper = mount(LoginView)
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')
    const loginButton = wrapper.find('[data-testid="btn-submit"]')

    emailInput.setValue('test@example.com')
    passwordInput.setValue('correctpassword')

    axiosInstance.post.mockResolvedValueOnce({
      data: {
        data: {
          token: 'fake-token',
          expires_in: 3600,
          user_data: { id: 1, name: 'Test User' }
        }
      }
    })

    await loginButton.trigger('submit.prevent')

    expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@example.com',
      password: 'correctpassword'
    })
    expect(routerPush).toHaveBeenCalledWith('/')
  })
})
