import "@fontsource/nunito";

export const styles = {
  wrapper: "w-full min-h-screen flex p-4",
  horizontalHalf: "flex-1 flex items-center justify-center p-5",
  bg: "w-full h-full bg-gray-600 rounded-3xl",
  title: `font-nunito text-title text-primary font-bold`,
  body: `font-nunito text-body text-secondary font-semiBold`,
  loginWrapper: `flex flex-col gap-6 w-full max-w-[460px] min-w-[220px]`,
  input: `flex flex-col gap-1 w-full max-w-[460px] min-w-[220px]`,
  inputLabel: `font-nunito text-label text-primary font-semiBold`,
  inputField: `p-2 px-3 rounded-lg bg-inputBg border border-inputStroke text-value font-nunito placeholder:text-tertiary placeholder:font-nunito focus:outline-none focus:ring-tertiary focus:ring-1`,
  formWrapper: `flex flex-col gap-4 items-center`,
  onboardingButton: `
  p-3 bg-secondary rounded-xl font-nunito text-body cursor-pointer hover:shadow-xl 
  transition duration-300
  w-full max-w-[460px] min-w-[220px]`,
  profileForm: `grid grid-cols-2 gap-4`,
  inputWrapper: `grid grid-cols-2 gap-4 items-center w-full`
};