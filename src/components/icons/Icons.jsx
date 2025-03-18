import React from 'react';
import Svg, { Path ,Circle ,Line} from 'react-native-svg';

export const ProfileIcon = ({ width = 24, height = 24, color = '#000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 20C6 17.7909 7.79086 16 10 16H14C16.2091 16 18 17.7909 18 20V21H6V20Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const AddClinicIcon = ({ width = 24, height = 24, color = '#000' }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        {/* Hospital Building */}
        <Path
          d="M3 21H21C21.55 21 22 20.55 22 20V6C22 5.45 21.55 5 21 5H3C2.45 5 2 5.45 2 6V20C2 20.55 2.45 21 3 21Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Windows */}
        <Path d="M7 10H9" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <Path d="M15 10H17" stroke={color} strokeWidth={2} strokeLinecap="round" />
        {/* Main Door */}
        <Path d="M12 21V15H16V21" stroke={color} strokeWidth={2} strokeLinecap="round" />
        {/* Plus Symbol */}
        <Path d="M12 7V11M10 9H14" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </Svg>
    );
  };

  export const AddScheduleIcon = ({ width = 24, height = 24, color = '#000' }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        {/* Outer Clock Circle */}
        <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />

        {/* Clock Hands */}
        <Path d="M12 7V12L15 14" stroke={color} strokeWidth={2} strokeLinecap="round" />

        {/* Plus Symbol (Integrated) */}
        <Line x1="19" y1="5" x2="19" y2="9" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <Line x1="17" y1="7" x2="21" y2="7" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </Svg>
    );
  };
export const LogoutIcon = ({ width = 24, height = 24, color = '#000' }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 17L21 12L16 7"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21 12H9"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };



export const AdminIcon = ({ width = 24, height = 24, color = '#000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const UpdateProfileIcon = ({ width = 24, height = 24, color = '#000' }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        {/* Camera Body */}
        <Path
          d="M4 8C4 6.895 4.895 6 6 6H8L10 4H14L16 6H18C19.105 6 20 6.895 20 8V18C20 19.105 19.105 20 18 20H6C4.895 20 4 19.105 4 18V8Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Camera Lens */}
        <Path
          d="M12 14C13.657 14 15 12.657 15 11C15 9.343 13.657 8 12 8C10.343 8 9 9.343 9 11C9 12.657 10.343 14 12 14Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Upload Arrow Inside the Camera */}
        <Path
          d="M12 7V11M10 9H14"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };

  export const AdminPanelSettingsIcon = ({ width = 40, height = 40, color = '#000' }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        {/* Shield Shape */}
        <Path
          d="M12 2L4 6V11C4 16 8 20 12 22C16 20 20 16 20 11V6L12 2Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* User Icon */}
        <Circle cx="12" cy="14" r="3" stroke={color} strokeWidth={2} />

        {/* Gear Icon for Settings */}
        <Path
          d="M19.5 7.5L20.2 9L22 9.5L20.7 11L20.9 13L19 12L17.1 13L17.3 11L16 9.5L17.8 9L19.5 7.5Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* User Base (for more clarity) */}
        <Path
          d="M9 18C10.5 16.5 13.5 16.5 15 18"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };
  export const RefreshIcon = ({ width = 40, height = 40, color = '#000' }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        {/* Circular Arrow */}
        <Path
          d="M4.93 4.93C6.78 3.08 9.27 2 12 2C16.97 2 21 6.03 21 11H18L22 15L26 11H23C23 5.48 18.52 1 12 1C8.74 1 5.74 2.44 3.51 4.93"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Arrow Tail */}
        <Path
          d="M19.07 19.07C17.22 20.92 14.73 22 12 22C7.03 22 3 17.97 3 13H6L2 9L-2 13H1C1 18.52 5.48 23 12 23C15.26 23 18.26 21.56 20.49 19.07"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };

  export const CheckCircleIcon = ({ size = 60, color = '#4CAF50' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <Path d="M8 12l2.5 2.5L16 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  export const PersonIcon = ({ size = 24, color = '#fff' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" />
      <Path d="M4 20c0-4 4-7 8-7s8 3 8 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );

  export const BadgeIcon = ({ size = 24, color = '#fff' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 6h16v12H4z" stroke={color} strokeWidth="2" />
      <Path d="M9 10h6M9 14h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
