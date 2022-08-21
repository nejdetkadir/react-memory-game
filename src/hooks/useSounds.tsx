import { useAudio } from 'react-use';

export default function useSounds() {
  const [failureAudio, failureState, failureControls] = useAudio({
    src: require('./../assets/failure.wav'),
  });

  const [successAudio, successState, successControls] = useAudio({
    src: require('./../assets/success.wav'),
  });

  const playFailureSound = () => {
    setTimeout(() => {
      failureControls.volume(1)
      failureControls.play();

      setTimeout(() => {
        failureControls.pause();
        failureControls.seek(0);
      }, 1500);
    }, 1000);
  }

  const playSuccessSound = () => {
    setTimeout(() => {
      successControls.volume(1)
      successControls.play();
  
      setTimeout(() => {
        successControls.pause();
        successControls.seek(0);
      }, 1500);
    }, 1000);
  }

  return {
    playFailureSound,
    failureAudio,
    playSuccessSound,
    successAudio,
  };
}
