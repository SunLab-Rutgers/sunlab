---
title: Using Overleaf
category: coding-and-version-control
order: 3
summary: Minimum LaTeX basics for writing text, equations, and figures in Overleaf.
author: Chong Sun
created: 2026-07-26
updated: 2026-07-26
---

LaTeX is a convenient tool for scientific writing, especially when you need to insert lots of equations. 
[Overleaf](https://www.overleaf.com/) is an online LaTeX editor that allows multiple users to write together. Our group uses Overleaf to

- Keep project notes
- Write manuscripts

## Overleaf Premium Account 
Faculty, staff and grad students from SAS can get the Overleaf premium feature. Follow this [website](https://www.overleaf.com/edu/rutgers) to get your Premium account. 

If you already have an Overleaf account, simply link your Rutgers email to it:

Click on the three dots by the Account on the lower left corner -> choose Account settings -> Choose Add another email and put your Rutgers email in.


When logging in, use the SSO option

<!-- Change the width below to resize this image, for example: width: 300px; or width: 70%; -->
<img src="/assets/images/wiki/overleaf-sso.png" alt="Overleaf SSO login option" style="width: 360px;">

## Start A Project

Click on New Project on the upper left corner, put your project name in, and you will start an Overleaf project. The main file is usually called `main.tex`.

This creates a default article document, and you can put your content in between `\begin{document}` and `\end{document}`.

The default document looks like this if your title is "test": 

```latex
\documentclass{article}
\usepackage{graphicx} % Required for inserting images

\title{test}
\author{Chong Sun}
\date{July 2026}

\begin{document}

\maketitle

\section{Introduction}

\end{document}
```

You should insert your content after `\maketitle`.

Here is a short [101](https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes) for writing with LaTex.

### Compliling
Simply type CTRL + s, or click `Recompile` to see the PDF. 

### Templates
You might have noticed that the default LaTeX article looks not so pretty. For journal articles, there are usually Overleaf templates. Here is an imcomplete list:

- [American Chemical Society Journals](https://www.overleaf.com/latex/templates/latex-template-for-american-chemical-society-acs-journal-submissions/swszwgfqsshj)
- [American Physical Society Journals](https://www.overleaf.com/latex/templates/revtex-4-dot-2-template-and-sample/yydsrzvrqrzs)
- [AIP Publishing Journals](https://www.overleaf.com/latex/templates/template-for-submission-to-aip-publishing-journals/xhsskcchtbxf)
- [Springer Nature](https://www.overleaf.com/latex/templates/springer-nature-latex-template/myxmhdsbzkyd)
- [Science](https://www.overleaf.com/latex/templates/latex-template-for-science-family-journals/kjytmmfyxthd)

You can also find other templates that are useful. 

## Sections And Text

Use section commands to organize the document:

```latex
\section{Main Section}
\subsection{Subsection}
\subsubsection{Smaller Subsection}
```

Use a blank line to start a new paragraph.

## Inline And Display Equations

Use single dollar signs for inline equations:

```latex
The energy is $E = mc^2$.
```

Use an equation environment for displayed equations:

```latex
\begin{equation}
E = mc^2
\end{equation}
```

Use `align` for multiple aligned equations:

```latex
\begin{align}
H\psi &= E\psi \\
\rho(\mathbf{r}) &= |\psi(\mathbf{r})|^2
\end{align}
```

## Add A Figure

Upload the figure file to Overleaf, then include it with `\includegraphics`.

```latex
\begin{figure}
  \centering
  \includegraphics[width=0.65\textwidth]{figure.png}
  \caption{A short description of the figure.}
  \label{fig:example}
\end{figure}
```

Reference the figure in text:

```latex
Figure~\ref{fig:example} shows the main result.
```

## A Complete Example

```latex
\documentclass{article}

\usepackage{graphicx}
\usepackage{amsmath}

\title{A Short LaTeX Example}
\author{Your Name}
\date{\today}

\begin{document}

\maketitle

\section{Introduction}

This is a short Overleaf example with an equation and a figure.

\begin{equation}
E = mc^2
\end{equation}

\begin{figure}
  \centering
  \includegraphics[width=0.65\textwidth]{figure.png}
  \caption{Example figure.}
  \label{fig:example}
\end{figure}

Figure~\ref{fig:example} shows an uploaded image.

\end{document}
```

## Common Tips

- Every opening brace `{` needs a closing brace `}`.
- Every `\begin{...}` needs a matching `\end{...}`.
- Figure filenames should avoid spaces.
- If the PDF does not update, check the error message near the failed line number.
