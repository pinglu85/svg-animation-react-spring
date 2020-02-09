import React, { useRef } from 'react';
import { animated as a, useSpring, useChain } from 'react-spring';
import useIntersect from './useIntersect';
import featureStyles from './Features.module.css';

// Icons
const keys = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <path
      d="M17.5 22C15 22 13 20 13 17.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5zm0-7c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z"
      fill="#2e251b"
    ></path>
    <path
      d="M17.5 64c-.2 0-.5-.1-.7-.2l-3.5-3c-.2-.2-.3-.5-.3-.8v-5c0-.3.1-.5.3-.7l1.3-1.3-1.3-1.3c-.2-.2-.3-.4-.3-.7v-1c0-.3.1-.5.3-.7l1.3-1.3-1.3-1.3c-.2-.2-.3-.4-.3-.7v-6.6c-7.6-2-13-9-13-16.9C0 12.9 7.9 5 17.5 5S35 12.9 35 22.5c0 7.9-5.4 14.9-13 16.9V60c0 .4-.2.7-.5.9l-3.3 2.9c-.3.1-.5.2-.7.2zM15 59.5l2.5 2.1 2.5-2.2V38.6c0-.5.3-.9.8-1C27.9 36.1 33 29.7 33 22.5 33 14 26 7 17.5 7S2 14 2 22.5c0 7.2 5.1 13.6 12.2 15.1.5.1.8.5.8 1v7l1.7 1.7c.4.4.4 1 0 1.4L15 50.4v.2l1.7 1.7c.4.4.4 1 0 1.4L15 55.4v4.1z"
      fill="#2e251b"
    ></path>
    <path
      d="M58.1 47.5c-.3 0-.5-.1-.7-.3l-3.5-3.5c-.2-.2-.3-.4-.3-.7v-1.8h-1.8c-.3 0-.5-.1-.7-.3l-.7-.7c-.2-.2-.3-.4-.3-.7v-1.8h-1.8c-.3 0-.5-.1-.7-.3l-4.7-4.6c-2.1 1.2-4.5 2-6.9 2.3-.6.1-1-.3-1.1-.9-.1-.5.3-1 .9-1.1 2.4-.3 4.7-1.1 6.8-2.4.4-.3.9-.2 1.2.1l4.9 4.9h2.4c.5 0 1 .4 1 1v2.4l.1.1h2.4c.5 0 1 .4 1 1v2.4l2.9 2.9 3.3-.2.2-3.3-14.8-14.8c-.3-.3-.4-.9-.1-1.2 3.9-6.1 3-14.2-2.1-19.3C42 3.6 38.2 2 34 2c-4.1 0-8 1.6-11 4.5-.2.2-.4.4-.6.7-.4.4-1 .4-1.4.1-.4-.4-.4-1-.1-1.4.2-.3.5-.5.7-.7C24.9 1.8 29.3 0 34 0s9.1 1.8 12.4 5.1c5.6 5.6 6.7 14.4 2.8 21.2l14.6 14.6c.3.3.4.7.2 1l-.3 4.4c0 .5-.4.9-.9.9l-4.7.3z"
      fill="#2e251b"
    ></path>
  </svg>
);

const flower = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <path
      d="M33.1 59.9H33c-.3 0-.7-.2-.8-.5-.2-.3-.2-.7 0-1 .2-.4 4.5-8.7 13.4-14.3 9.2-5.7 17.2-5.3 17.6-5.3.3 0 .6.2.8.5.2.3.2.6.1.9-.1.4-3.4 8.8-12.4 14.2-9.1 5.3-17.4 5.5-18.6 5.5zm28.3-19c-2.7.2-8.5 1-14.9 5-6.2 3.9-10.1 9.3-11.7 11.9 3-.3 9.2-1.3 15.7-5.1 6.3-3.8 9.6-9.3 10.9-11.8zM28 56c-4.3 0-12.2-.7-19-5C2.2 46.6.1 40.6 0 40.3c0-.3 0-.6.1-.8.1-.2.4-.4.7-.5.1 0 3.5-.6 8.3.1.5.1.9.6.8 1.1s-.6.9-1.1.8c-2.8-.4-5.1-.4-6.4-.3.9 1.9 3.1 5.6 7.6 8.4 7.2 4.6 15.9 4.8 19.3 4.7-1.5-2.4-5.5-7.7-13.3-10.9-.5-.2-.9-.4-1.4-.5-.5-.2-.8-.8-.6-1.3.2-.5.8-.8 1.3-.6.5.2 1 .3 1.4.5C28 45.8 31.8 54.1 31.9 54.5c.1.3.1.6 0 .9-.2.3-.4.5-.8.5-.1 0-1.3.1-3.1.1z"
      fill="#2e251b"
    ></path>
    <path
      d="M32 64c-.6 0-1-.4-1-1V36c0-.6.4-1 1-1s1 .4 1 1v27c0 .6-.4 1-1 1zm0-36c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm0-12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"
      fill="#2e251b"
    ></path>
    <path
      d="M38.8 39.8c-2.5 0-5-1-6.8-2.9-3.2 3.4-8.5 3.9-12.3 1.1-2-1.5-3.4-3.7-3.8-6.1-.3-2.1 0-4.1 1-5.9-1.9-.9-3.4-2.3-4.3-4.2-1.1-2.2-1.3-4.8-.6-7.2 1.5-4.5 6.1-7.2 10.6-6.4C23.3 3.6 27.2 0 32 0s8.7 3.6 9.3 8.2c2-.4 4.1-.1 6 .9 2.2 1.1 3.9 3.1 4.7 5.5.8 2.4.6 4.9-.6 7.2-.9 1.9-2.5 3.3-4.3 4.2 1 1.8 1.3 3.9 1 5.9-.4 2.5-1.7 4.7-3.8 6.1-1.6 1.2-3.6 1.8-5.5 1.8zM32 34.3c.3 0 .6.2.8.4 2.4 3.3 7.1 4 10.4 1.6 1.6-1.2 2.7-2.9 3-4.8.3-2-.2-3.9-1.3-5.5-.2-.3-.2-.6-.1-.9.1-.3.3-.5.6-.6 1.9-.6 3.4-1.9 4.3-3.7.9-1.8 1.1-3.8.4-5.7-.6-1.9-1.9-3.4-3.7-4.3-1.8-.9-3.8-1.1-5.7-.4-.3.1-.6 0-.9-.1-.3-.2-.4-.5-.4-.8C39.4 5.3 36.1 2 32 2c-4.1 0-7.4 3.3-7.4 7.4 0 .3-.2.6-.4.8-.3.2-.6.2-.9.1-3.9-1.3-8.1.9-9.3 4.8-.6 1.9-.5 3.9.4 5.7.9 1.8 2.4 3.1 4.3 3.7.3.1.5.3.6.6.1.3 0 .6-.1.9-1.2 1.6-1.6 3.6-1.3 5.5.3 2 1.4 3.7 3 4.8 3.3 2.4 8 1.7 10.4-1.6.1-.2.4-.4.7-.4z"
      fill="#2e251b"
    ></path>
  </svg>
);

const calculator = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <path
      d="M54.1 64h-44C8.4 64 7 62.6 7 60.9V25c0-.6.4-1 1-1s1 .4 1 1v35.9c0 .6.5 1.1 1.1 1.1h44c.5 0 .9-.4.9-.9V25c0-.6.4-1 1-1s1 .4 1 1v36.1c0 1.6-1.3 2.9-2.9 2.9z"
      fill="#2e251b"
    ></path>
    <path
      d="M63 24c-.2 0-.4-.1-.6-.2L32 2.2 1.6 23.8c-.4.3-1.1.2-1.4-.2-.3-.5-.2-1.1.2-1.4l31-22c.3-.2.8-.2 1.2 0l31 22c.5.3.6.9.2 1.4-.2.3-.5.4-.8.4z"
      fill="#2e251b"
    ></path>
    <path
      d="M28 25h-5v-5c0-.6-.4-1-1-1s-1 .4-1 1v5h-5c-.6 0-1 .4-1 1s.4 1 1 1h5v5c0 .6.4 1 1 1s1-.4 1-1v-5h5c.6 0 1-.4 1-1s-.4-1-1-1zm20 2H36c-.6 0-1-.4-1-1s.4-1 1-1h12c.6 0 1 .4 1 1s-.4 1-1 1zm0 17H36c-.6 0-1-.4-1-1s.4-1 1-1h12c.6 0 1 .4 1 1s-.4 1-1 1zm0 7H36c-.6 0-1-.4-1-1s.4-1 1-1h12c.6 0 1 .4 1 1s-.4 1-1 1zm-24.6-4.5l4.2-4.2c.4-.4.4-1 0-1.4s-1-.4-1.4 0L22 45.1l-4.2-4.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l4.2 4.2-4.2 4.2c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l4.2-4.2 4.2 4.2c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-4.2-4.2z"
      fill="#2e251b"
    ></path>
  </svg>
);

// Items
const items = [
  {
    icon: keys,
    heading: 'Kostenloser Mietservice',
    desc:
      'Lorem ipsum dolor sit amet, consect adipiscing elit ut aliquam, purus sit amet luctus venenatis.'
  },
  {
    icon: flower,
    heading: 'Ideale Kapitalanlage',
    desc:
      'Lorem ipsum dolor sit amet, consect adipiscing elit ut aliquam, purus sit amet luctus venenatis.'
  },
  {
    icon: calculator,
    heading: 'Investitionsmanagement',
    desc:
      'Lorem ipsum dolor sit amet, consect adipiscing elit ut aliquam, purus sit amet luctus venenatis.'
  }
];

const Features = () => {
  const [addToRefs, inView] = useIntersect({
    triggerOnce: true
  });

  // Hard code the animation because delay between each item
  // cannot be modified when using useTrail.
  // Item one animations
  const animation = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'scale(1)' : 'scale(0)',
    from: { opacity: 0, transform: 'scale(0)' },
    config: { mass: 5, tension: 2000, friction: 200 }
  };

  const iconOneRef = useRef();
  const iconOneSpring = useSpring({
    ref: iconOneRef,
    ...animation
  });

  const copyOneRef = useRef();
  const copyOneSpring = useSpring({
    ref: copyOneRef,
    ...animation
  });

  // Item two animations
  const iconTwoRef = useRef();
  const iconTwoSpring = useSpring({
    ref: iconTwoRef,
    ...animation
  });

  const copyTwoRef = useRef();
  const copyTwoSpring = useSpring({
    ref: copyTwoRef,
    ...animation
  });

  // Item three animations
  const iconThreeRef = useRef();
  const iconThreeSpring = useSpring({
    ref: iconThreeRef,
    ...animation
  });

  const copyThreeRef = useRef();
  const copyThreeSpring = useSpring({
    ref: copyThreeRef,
    ...animation
  });

  useChain(
    [
      { current: iconOneRef.current },
      copyOneRef,
      iconTwoRef,
      copyTwoRef,
      iconThreeRef,
      copyThreeRef
    ],
    [0, 0.2, 0.4, 0.6, 0.8, 1]
  );

  return (
    <div className={featureStyles.FeaturesWrapper} ref={addToRefs}>
      <div>
        <a.div
          style={{
            willChange: 'opacity, transform',
            ...iconOneSpring
          }}
          className={featureStyles.FeatureIcon}
        >
          {items[0].icon}
        </a.div>
        <a.div
          style={{
            willChange: 'opacity, transform',
            transformOrigin: '0 50%',
            ...copyOneSpring
          }}
          className={featureStyles.FeatureCopyWrapper}
        >
          <h4 className={featureStyles.FeatureTitle}>{items[0].heading}</h4>
          <p className={featureStyles.FeatureDesc}>{items[0].desc}</p>
        </a.div>
      </div>
      <div>
        <a.div
          style={{
            willChange: 'opacity, transform',
            ...iconTwoSpring
          }}
          className={featureStyles.FeatureIcon}
        >
          {items[1].icon}
        </a.div>
        <a.div
          style={{
            willChange: 'opacity, transform',
            transformOrigin: '0 50%',
            ...copyTwoSpring
          }}
          className={featureStyles.FeatureCopyWrapper}
        >
          <h4 className={featureStyles.FeatureTitle}>{items[1].heading}</h4>
          <p className={featureStyles.FeatureDesc}>{items[1].desc}</p>
        </a.div>
      </div>
      <div>
        <a.div
          style={{
            willChange: 'opacity, transform',
            ...iconThreeSpring
          }}
          className={featureStyles.FeatureIcon}
        >
          {items[2].icon}
        </a.div>
        <a.div
          style={{
            willChange: 'opacity, transform',
            transformOrigin: '0 50%',
            ...copyThreeSpring
          }}
          className={featureStyles.FeatureCopyWrapper}
        >
          <h4 className={featureStyles.FeatureTitle}>{items[2].heading}</h4>
          <p className={featureStyles.FeatureDesc}>{items[2].desc}</p>
        </a.div>
      </div>
    </div>
  );
};

export default Features;
