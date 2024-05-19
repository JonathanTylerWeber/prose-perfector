import { renderHook, act } from '@testing-library/react';
import UseLocalStorage from './UseLocalStorage';
import { vi } from 'vitest';

describe('UseLocalStorage', () => {
  const key = 'test-key';
  const initialValue = 'initial';

  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial value if localStorage is empty', () => {
    const { result } = renderHook(() => UseLocalStorage(key, initialValue));
    expect(result.current[0]).toBe(initialValue);
  });

  it('should load the value from localStorage if it exists', () => {
    window.localStorage.setItem(key, 'stored value');
    const { result } = renderHook(() => UseLocalStorage(key, initialValue));
    expect(result.current[0]).toBe('stored value');
  });

  it('should save the value to localStorage', () => {
    const { result } = renderHook(() => UseLocalStorage(key, initialValue));
    act(() => {
      result.current[1]('new value');
    });
    expect(result.current[0]).toBe('new value');
    expect(window.localStorage.getItem(key)).toBe('new value');
  });

  it('should update the value in localStorage', () => {
    const { result } = renderHook(() => UseLocalStorage(key, initialValue));
    act(() => {
      result.current[1]((prev) => prev + ' updated');
    });
    expect(result.current[0]).toBe('initial updated');
    expect(window.localStorage.getItem(key)).toBe('initial updated');
  });

  it('should handle errors when accessing localStorage', () => {
    const mockGetItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Failed to access localStorage');
    });

    const { result } = renderHook(() => UseLocalStorage(key, initialValue));
    expect(result.current[0]).toBe(initialValue);
    expect(console.error).toHaveBeenCalledWith('Error loading from localStorage:', new Error('Failed to access localStorage'));

    mockGetItem.mockRestore();
  });

  it('should handle errors when saving to localStorage', () => {
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Failed to save to localStorage');
    });

    const { result } = renderHook(() => UseLocalStorage(key, initialValue));
    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
    expect(console.error).toHaveBeenCalledWith('Error saving to localStorage:', new Error('Failed to save to localStorage'));

    mockSetItem.mockRestore();
  });
});
