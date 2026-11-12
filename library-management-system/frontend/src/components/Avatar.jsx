const avatarColors = [
  "avatar-blue",
  "avatar-violet",
  "avatar-teal",
  "avatar-amber",
  "avatar-rose",
];

export function getInitials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?";
}

export default function Avatar({ name, size = "md", className = "" }) {
  const colorIndex = [...(name || "")].reduce((total, char) => total + char.charCodeAt(0), 0) % avatarColors.length;
  return (
    <span className={`avatar ${avatarColors[colorIndex]} avatar-${size} ${className}`} aria-hidden="true">
      {getInitials(name)}
    </span>
  );
}
