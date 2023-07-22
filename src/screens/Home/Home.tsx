import { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";
import MathJaxComponent from "./Components/Mathjax";
import { FaHome } from "react-icons/fa";

interface LawProblem {
  "Problem Statement": string;
  "Problem Number": string;
  Topic: string;
  Source: string;
  "Answer Candidates": string[];
  "Output Format Instructions": string;
  Solution: string;
  "Final Answer": string;
  Images: string[];
  "Problem Type": string;
  _id: string;
}

interface numericalProblem {
  Problem_Statement: string;
  "Problem Type": string;
  Topic: string;
  Solution: string;
  "Final Answer": string;
  Images: string[];
  "Output Format Instructions": string;
  rubric: string;
  rubric_template: string;
  _id: string;
}

function isNumericalProblem(
  problem: LawProblem | numericalProblem
): problem is numericalProblem {
  return (problem as numericalProblem).Problem_Statement !== undefined;
}

function isLawProblem(
  problem: LawProblem | numericalProblem
): problem is LawProblem {
  return (problem as LawProblem).Solution == "";
}

export default function Home() {
  const [problem, setProblem] = useState<LawProblem | numericalProblem | null>(
    null
  );
  const [randomEndpoint, setRandomEndpoint] = useState("");
  const [problemType, setProblemType] = useState("");
  const [problemStatement, setProblemStatement] = useState<string>("");
  const [finalAnswer, setFinalAnswer] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [answerCandidates, setAnswerCandidates] = useState<string[]>([]);

  const [showSolution, setShowSolution] = useState(false);
  const [showFinalAnswer, setShowFinalAnswer] = useState(false);

  const endpoints = {
    "Law Problem": "/api/lawProblem",
    "Math Problem": "/api/mathProblem",
    "MCAT Reading Problem": "/api/mcatReadingProblem",
    "MCAT Science Problem": "/api/mcatScienceProblem",
    "MCAT Science Image Problem": "/api/mcatScienceImageProblem",
    "Physics Problem": "/api/physicsProblem",
    "Physics Image Problem": "/api/physicsImgProblem",
  };

  const fetchProblem = (endpoint: string) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProblem(data["randomProblem"]);
      });
  };
  useEffect(() => {
    if (problem) {
      if (isNumericalProblem(problem)) {
        setProblemStatement(problem.Problem_Statement);
        setSolution(problem["Solution"]);
        setFinalAnswer(problem["Final Answer"]);
      } else {
        setProblemStatement(problem["Problem Statement"]);
        setSolution(problem["Solution"]);
        setAnswerCandidates(problem["Answer Candidates"]);
        setFinalAnswer(problem["Final Answer"]);
      }
    }
  }, [problem]);

  useEffect(() => {
    const randomProblemType =
      Object.keys(endpoints)[
        Math.floor(Math.random() * Object.keys(endpoints).length)
      ];
    setProblemType(randomProblemType);
    const randomEndpoint = (endpoints as { [key: string]: string })[
      randomProblemType
    ];
    setRandomEndpoint(randomEndpoint);
    fetchProblem(randomEndpoint);
  }, []);

  const handleProblemTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedProblemType = event.target.value;
    setProblemType(selectedProblemType);
    const selectedEndpoint = (endpoints as { [key: string]: string })[
      selectedProblemType
    ];
    setRandomEndpoint(selectedEndpoint);
    fetchProblem(selectedEndpoint);
  };

  const toggleSolutionVisibility = () => {
    setShowSolution((prevState) => !prevState);
  };

  const toggleFinalAnswerVisibility = () => {
    setShowFinalAnswer((prevState) => !prevState);
  };

  if (!problem) {
    return <div>Loading...</div>;
  }

  console.log("Problem Statement:", problemStatement);

  console.log("Final Answer:", finalAnswer);

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        bg="teal.500"
        width="100%"
        boxShadow="md"
      >
        <Flex align="center">
          <Link
            href="https://duckai.org"
            mr={4}
            display="flex"
            alignItems="center"
            color="white"
          >
            <Icon as={FaHome} w={6} h={6} />
            <Text ml={2} fontSize="xl" fontWeight="bold">
              DuckAI
            </Text>
          </Link>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        align="center"
        minHeight="100vh"
        maxW="80vw"
        marginLeft="auto"
        marginRight="auto"
        p={2}
      >
        <Heading mb={5}>Advanced Reasoning Benchmark</Heading>

        <Heading mb={5} as="h4" size="md">
          an interactive problem sampler
        </Heading>
        <Select value={problemType} onChange={handleProblemTypeChange} mb={4}>
          {Object.keys(endpoints).map((problemType, index) => (
            <option key={index} value={problemType}>
              {problemType}
            </option>
          ))}
        </Select>

        <Button mt={2} mb={5} onClick={() => fetchProblem(randomEndpoint)}>
          Fetch New Problem
        </Button>

        <Box w="full" borderWidth="1px" borderRadius="md" p={4} mb={5}>
          <Box fontWeight="bold" mb={4}>
            <MathJaxComponent problemStatement={problemStatement} />
          </Box>
          {randomEndpoint === "/api/mcatScienceImageProblem" && (
            <Box mt={5}>
              <Text fontWeight="bold" mb={2}>
                Images:
              </Text>
              {problem.Images &&
                problem.Images.map((imageName, index) => {
                  const imageUrl = `https://storage.googleapis.com/images_problems/${imageName}`;
                  return (
                    <Center key={index} mb={4}>
                      <Image
                        src={imageUrl}
                        alt={`Problem image ${index + 1}`}
                        width={"50%"}
                        height={"auto"}
                        maxW="50vw"
                        mx="auto"
                      />
                    </Center>
                  );
                })}
            </Box>
          )}
          {randomEndpoint === "/api/physicsImgProblem" && (
            <Box mt={5}>
              <Text fontWeight="bold" mb={2}>
                Images:
              </Text>
              {problem.Images &&
                problem.Images.map((imageUrl, index) => {
                  return (
                    <Center key={index} mb={4}>
                      <Image
                        src={imageUrl}
                        alt={`Problem image ${index + 1}`}
                        width={"50%"}
                        height={"auto"}
                        maxW="50vw"
                        mx="auto"
                      />
                    </Center>
                  );
                })}
            </Box>
          )}

          {!isNumericalProblem(problem) && (
            <Box mt={5} key={`${problemType}-${Date.now()}`}>
              <Text fontWeight="bold" mb={2}>
                Answer Candidates:
              </Text>
              {answerCandidates &&
                answerCandidates.map((answer, index) => {
                  let prefix = String.fromCharCode(index + 65);
                  return (
                    <Text key={index}>
                      {`${prefix}. `}
                      <MathJaxComponent problemStatement={answer} />
                    </Text>
                  );
                })}
            </Box>
          )}

          <Button mt={2} onClick={toggleSolutionVisibility}>
            {showSolution ? "Hide Solution" : "Show Solution"}
          </Button>
          {!isLawProblem(problem) && showSolution && (
            <Box mt={5}>
              <Text fontWeight="bold" mb={2}>
                Solution:
              </Text>
              {solution && <MathJaxComponent problemStatement={solution} />}
            </Box>
          )}
          <br />

          <Button mt={2} onClick={toggleFinalAnswerVisibility}>
            {showFinalAnswer ? "Hide Final Answer" : "Show Final Answer"}
          </Button>

          {showFinalAnswer && (
            <Box mt={5}>
              <Text fontWeight="bold" mb={2}>
                Final Answer:
              </Text>
              <MathJaxComponent problemStatement={finalAnswer} />
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
}
