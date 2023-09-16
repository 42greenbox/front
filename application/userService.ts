import DI from "@/lib/DI";

export const userService = () => {
  const userRepository = DI.getUserRepository();

  const getMe = async () => {
    const data = await userRepository.getMe();
    return data;
  };

  const login = async () => {
    await userRepository.login();
  };

  return { getMe, login };
};
