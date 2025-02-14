export function getPriority(designation) {
  switch (designation) {
    case "Coordinator":
      return 5;
    case "Assistant Coordinator":
      return 4;
    case "Lead":
      return 3;
    case "Assistant Team Lead":
      return 2;
    case "Member":
      return 1;
    default:
      return 1;
  }
}
