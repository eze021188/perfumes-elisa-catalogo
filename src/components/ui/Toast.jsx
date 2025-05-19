import { Toaster } from 'sonner';

export default function Toast() {
  return (
    <Toaster
      position="bottom-center"
      expand={false}
      richColors
      closeButton
      theme="light"
      duration={3000}
    />
  );
}