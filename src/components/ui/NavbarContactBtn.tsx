"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

interface NavbarContactBtnProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function NavbarContactBtn({
  href = "/contact",
  onClick,
  className = "",
}: NavbarContactBtnProps) {
  return (
    <StyledWrapper className={className}>
      <Link href={href} onClick={onClick}>
        <span>Contact Me</span>
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  a {
    outline: none;
    cursor: pointer;
    border: none;
    padding: 0.65rem 1.6rem;
    margin: 0;
    font-family: inherit;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.03rem;
    font-weight: 700;
    font-size: 14px;
    border-radius: 500px;
    overflow: hidden;
    background: #22c55e;
    color: ghostwhite;
    text-decoration: none;
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  a:hover {
    transform: scale(1.02);
    box-shadow: 0 0 28px rgba(34, 197, 94, 0.55);
  }

  a:active {
    transform: scale(0.96);
  }

  a span {
    position: relative;
    z-index: 10;
    transition: color 0.4s;
    white-space: nowrap;
  }

  a:hover span {
    color: #050a07;
  }

  a::before,
  a::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  a::before {
    content: "";
    background: #050a07;
    width: 125%;
    left: -12%;
    transform: skew(30deg);
    transition: transform 0.45s cubic-bezier(0.3, 1, 0.8, 1);
  }

  a:hover::before {
    transform: translate3d(100%, 0, 0);
  }
`;

export default NavbarContactBtn;
