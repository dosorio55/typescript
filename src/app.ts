interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validateForm = (validateObject: Validatable) => {
  const {
    value,
    required,
    max = 999,
    maxLength = 100,
    min = 1,
    minLength = 1,
  } = validateObject;

  let validValue: string | number | undefined = value;
  if (required && !value) {
    alert(`input must be defined`);
    validValue = undefined;
  } else if (
    (typeof value === "string" && maxLength && value.length > maxLength) ||
    (typeof value === "string" && minLength && value.length < minLength)
  ) {
    alert("min or max length are incorrect");
    validValue = undefined;
  } else if ((typeof "number" && value > max) || value < min) {
    alert("min or max length are incorrect");
    validValue = undefined;
  }

  return validValue;
};

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;
    this.hostElement = <HTMLDivElement>document.getElementById("app");

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = validateForm({
      value: this.titleInputElement.value,
      required: true,
    });
    const enteredDescription = validateForm({
      value: this.descriptionInputElement.value,
      required: true,
    });
    const enteredPeople = validateForm({
      value: this.peopleInputElement.value,
      required: true,
    });

    if (!enteredTitle || !enteredDescription || !enteredPeople) {
      alert("invalid input");
      return;
    } else {
      return [
        enteredTitle.toString(),
        enteredDescription.toString(),
        +enteredPeople,
      ];
    }
  }

  private clearInput() {
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
    this.titleInputElement.value = "";
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      console.log(userInput);
      this.clearInput;
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
