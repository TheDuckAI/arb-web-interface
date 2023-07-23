import React from "react";
import {
  Box,
  Flex,
  Link,
  Heading,
  Text,
  IconButton,
  Button,
  Container,
  Icon,
} from "@chakra-ui/react";
import { FaHome, FaFilePdf, FaGithub, FaImages } from "react-icons/fa";
import { AiFillFile } from "react-icons/ai";


const authors = [
    { name: "Tomohiro Sawada", affiliations: [1, 2], href: "https://tomohiro-sawada.github.io/" },
    { name: "Daniel Paleka", affiliations: [1, 3], href: "https://danielpaleka.com/" },
    { name: "Alexander Havrilla", affiliations: [1, 2], href: "https://dahoas.github.io/" },
    { name: "Pranav Tadepalli", affiliations: [1, 2], href: "https://pranav.cc/" },
    { name: "Paula Vidas", affiliations: [1], href: "#" },
    { name: "Alexander Kranias", affiliations: [1, 2], href: "https://alexkranias.com/index.html" },
    { name: "John J Nay", affiliations: [4, 5], href: "http://johnjnay.com/" },
    { name: "Kshitij Gupta", affiliations: [1, 6], href: "https://kshitijkg.github.io/" },
    { name: "Aran Komatsuzaki", affiliations: [1, 2], href: "https://twitter.com/arankomatsuzaki" }
];

const affiliations = [
    "DuckAI",
    "Georgia Tech",
    "ETH Zürich",
    "Nomos AI",
    "Stanford University Center for Legal Informatics",
    "MILA"
  ];

const Arb: React.FC = () => {
  return (
    <Box bg="#F9FAFC">
      <Flex
        as="nav"
        align="center"
        justify="center"
        wrap="wrap"
        padding={6}
        bg="teal.500"
      >
        <Box
          flexBasis={{ base: "100%", md: "auto" }}
          flexGrow={1}
          textAlign={{ base: "center", md: "left" }}
        >
          <Link href="https://duckai.org" color="white">
            <Icon as={FaHome} w={6} h={6} />
          </Link>
        </Box>
      </Flex>

      <Box as="section" bg="gray.100" py={10}>
        <Container maxW="container.md">
          <Flex direction="column" align="center">
            <Heading as="h1" size="xl">
              ARB: Advanced Reasoning Benchmark for Large Language Models
            </Heading>

            <Text fontSize="lg" mt={4}>
              {authors.map((author, index) => (
                <React.Fragment key={author.name}>
                  <Link href={author.href} color="teal.500">
                    {author.name}
                  </Link>
                  <sup>
                    {author.affiliations.join(",")}
                  </sup>
                  {index < authors.length - 1 && ", "}
                </React.Fragment>
              ))}
            </Text>

            <Text fontSize="lg" mt={2}>
                {affiliations.map((affiliation, index) => (
                    <React.Fragment key={affiliation}>
                    <sup>{index + 1}</sup> {affiliation}
                    {index < affiliations.length - 1 && ", "}
                    </React.Fragment>
                ))}
            </Text>


            <Flex mt={4}>
              <Button
                leftIcon={<FaFilePdf />}
                colorScheme="teal"
                variant="solid"
              >
                Paper
              </Button>
              <Button
                leftIcon={<AiFillFile />}
                colorScheme="teal"
                variant="solid"
                ml={4}
              >
                arXiv
              </Button>
              <Link href="https://github.com/TheDuckAI/arb">
              <Button
                leftIcon={<FaGithub />}
                colorScheme="teal"
                variant="solid"
                ml={4}
              >
                Code
              </Button>
              </Link>
              <Link href="/home">
                <Button
                  leftIcon={<FaImages />}
                  colorScheme="teal"
                  variant="solid"
                  ml={4}
                >
                  Interface
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box as="section" py={10}>
        <Container maxW="container.md">
          <Flex direction="column" align="center">
            <Heading as="h2" size="lg">
              Abstract
            </Heading>

            <Text textAlign="justify" mt={4} w="4/5">
              Large Language Models (LLMs) have demonstrated remarkable
              performance on various quantitative reasoning and knowledge
              benchmarks, such as MMLU and MATH. However, many of these
              benchmarks are losing utility as LLMs get increasingly high
              scores, despite not yet achieving expert level performance in
              these domains. We introduce ARB, a novel benchmark composed of
              advanced reasoning problems designed to evaluate LLMs on text
              comprehension and expert domain reasoning. ARB presents a more
              challenging test than prior benchmarks, featuring questions that
              test deeper knowledge of mathematics, physics, biology, chemistry,
              and law.
            </Text>

            <Text textAlign="justify" mt={4} w="4/5">
              As a subset of ARB, we introduce a challenging set of math and
              physics problems which require advanced symbolic reasoning and
              domain knowledge. In order to improve both automatic and assisted
              symbolic evaluation capabilities, we introduce a rubric-based
              self-evaluation approach, allowing GPT-4 to score its own
              intermediate reasoning steps.
            </Text>

            <Text textAlign="justify" mt={4} w="4/5">
              We evaluate recent models such as GPT-4 and Claude on ARB and
              demonstrate that even with Chain-of-Thought prompting methods,
              current models score well below 50% on more demanding expert
              tasks. Further, we conduct a human evaluation of the symbolic
              subset of ARB, finding close agreement between annotators and
              GPT-4 self-evaluation scores.
            </Text>
          </Flex>
        </Container>
      </Box>

      <Flex
        as="footer"
        align="center"
        justify="center"
        wrap="wrap"
        padding={6}
        bg="teal.500"
      >
      </Flex>
    </Box>
  );
};

export default Arb;
